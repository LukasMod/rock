## check-elf-alignment.sh

Host-side utility that verifies ELF segment alignment for shared libraries.
It accepts a directory of files, an APK, or an APEX, and reports whether each
ELF binary is aligned to 16 KB or 64 KB page sizes.

### Purpose
- Ensure ELF LOAD segments are aligned to 2**14 (16 KB) or 2**16 (64 KB) or
  higher powers of two.
- Flag unaligned shared libraries so they can be rebuilt with correct
  alignment (typically required for arm64-v8a/x86_64).

### Usage
```
scripts/check-elf-alignment.sh [input-path|input-APK|input-APEX]
```

### Inputs
- A directory containing shared libraries.
- An `*.apk` file (the script unzips `lib/*` and inspects the extracted libs).
- An `*.apex` file (the script uses `deapexer` to extract contents).

### Dependencies
- `bash`
- `file`
- `objdump`
- `awk`, `grep`, `head`
- `unzip` (for APK input)
- `deapexer` (for APEX input)
- `zipalign` (optional, for APK zip-alignment verification)
- `shellUtils.sh` (local helpers for `title`, `warn`, `error`, `info`,
  `success`, and color constants)

### High-level flow
1. Parse and validate input.
2. If input is an APK, optionally run `zipalign` checks and extract `lib/*`.
3. If input is an APEX, extract the payload with `deapexer`.
4. Walk all files under the resolved directory.
5. For each ELF file, inspect the first `LOAD` segment alignment.
6. Print per-file alignment results and a final summary.
7. Clean up any temporary extraction directory on exit.

### Detailed behavior

#### 1) Argument parsing and validation
- Expects exactly one argument.
- Supports `--help`, `-h`, or `-?` to print usage.
- Fails if the path does not exist (neither file nor directory).

#### 2) APK input handling
- If the argument ends with `.apk`:
  - Registers a cleanup trap that removes the temporary extraction directory.
  - Prints a header and runs a zip alignment check (if supported):
    - Uses `zipalign -v -c -P 16 4 "$apk"` and filters output to:
      `lib/arm64-v8a`, `lib/x86_64`, and `Verification`.
    - If the build-tools version is too old (no `-P <pagesize_kb>` support),
      prints guidance to install `build-tools;35.0.0-rc3`.
  - Extracts `lib/*` from the APK into a temp directory:
    - `tmp=$(mktemp -d -t "<apk-name>_out_XXXXX")`
    - `unzip "$apk" lib/* -d "$tmp"`
  - Sets `dir` to the temp directory for further analysis.

#### 3) APEX input handling
- If the argument ends with `.apex`:
  - Registers a cleanup trap that removes the temporary extraction directory.
  - Extracts the APEX payload:
    - `tmp=$(mktemp -d -t "<apex-name>_out_XXXXX")`
    - `deapexer extract "$apex" "$tmp"`
  - Fails if `deapexer` returns a non-zero status.
  - Sets `dir` to the temp directory for further analysis.

#### 4) File traversal
- Scans all files under `dir` with:
  - `find "$dir" -type f`
- Warns if it encounters nested `.apk` or `.apex` files but does not recurse
  into them.
- Filters to ELF files using:
  - `file "$match" | grep ELF`

#### 5) Alignment check
- For each ELF file:
  - Reads the first `LOAD` segment alignment with:
    - `objdump -p "$match" | grep LOAD | awk '{ print $NF }' | head -1`
  - The resulting string is expected to look like `2**14`, `2**16`, etc.
  - The alignment is considered valid if it matches:
    - `2**(14..)` (16 KB or higher power of two)
  - Prints:
    - `ALIGNED` (green) if valid
    - `UNALIGNED` (red) if invalid, and adds it to a list

#### 6) Summary output
- If any unaligned libraries were found:
  - Prints `Found <N> unaligned libs (only arm64-v8a/x86_64 libs need to be aligned).`
- Otherwise, if the input was an APK/APEX (i.e., it had a filename):
  - Prints `ELF Verification Successful`
- Always ends with a `=====================` divider.

### Exit codes
- `0` on success (including the case where unaligned libs are found).
- `1` on usage errors, invalid path, or failed APEX extraction.

### Notes
- The ELF alignment check is independent of the APK zip alignment check.
- The zip alignment check is only shown when `zipalign` supports `-P`.
- The script is intended to run on the host machine (not device).

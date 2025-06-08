/**
 * Normalize vim plugin name
 *
 * @param rawName Raw plugin name string
 * @param pattern Replace pattern string
 * @returns The normalized one
 *
 * Note: Default pattern is reference to https://github.com/Shougo/dein.vim/blob/5985e18b12a9d9e0ecd1747e64da2fa384abb18c/autoload/dein/parse.vim#L94
 */
export function normalize(
  rawName,
  pattern = String.raw`^(n?vim|dps|denops)[_-]|[_-]n?vim$`,
) {
  const replacePattern = new RegExp(pattern, "g");
  return rawName.replaceAll(replacePattern, "");
}

/**
 * Trim tail `.vim` pattern
 *
 * @param rawName Raw plugin name that maybe included `.vim` pattern
 * @returns The trimed one
 */
export function trimTailDotVim(rawName) {
  return rawName.replace(/\.+n?vim$/, "");
}

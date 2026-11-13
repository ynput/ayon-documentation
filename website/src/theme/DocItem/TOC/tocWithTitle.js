/**
 * The table of contents lists only the headings below the title, so the title and
 * the text before the first heading have no entry. This puts the page title first,
 * linked to the top of the page (`#`).
 */
export default function tocWithTitle(toc, title, level = 2) {
    if (!toc.length || !title) {
        return toc;
    }
    return [{ value: title, id: "", level }, ...toc];
}

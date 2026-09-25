// Apply the saved language direction before the first paint to avoid an RTL layout shift.
try {
  const saved = localStorage.getItem('smb-language') || localStorage.getItem('smb-lang');
  if (saved === 'en' || saved === 'fr' || saved === 'ar') {
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
  }
} catch {
  // The page remains usable with the document's default English, left-to-right state.
}

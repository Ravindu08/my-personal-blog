import React, { useState, useRef, useEffect } from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHighlighter,
  FaHeading,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaCode,
  FaLink,
  FaMinus,
  FaEraser,
  FaEye,
  FaPen,
  FaFileCode,
  FaInfoCircle,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import ArticleContentRenderer from './ArticleContentRenderer';

// Highlight color presets
const HIGHLIGHT_COLORS = [
  { id: 'teal', label: 'Teal Mint', class: 'hl-teal', color: '#14b8a6', bg: 'bg-teal-400/25 text-teal-200' },
  { id: 'yellow', label: 'Sunshine Yellow', class: 'hl-yellow', color: '#eab308', bg: 'bg-yellow-400/30 text-yellow-200' },
  { id: 'purple', label: 'Electric Purple', class: 'hl-purple', color: '#a855f7', bg: 'bg-purple-400/25 text-purple-200' },
  { id: 'rose', label: 'Coral Rose', class: 'hl-rose', color: '#f43f5e', bg: 'bg-rose-400/25 text-rose-200' },
  { id: 'emerald', label: 'Emerald Green', class: 'hl-emerald', color: '#10b981', bg: 'bg-emerald-400/25 text-emerald-200' },
];

// Heading & Size options
const FONT_SIZES = [
  { value: 'p', label: 'Normal Body Text (16px)' },
  { value: 'h1', label: 'Title / Heading 1 (32px Bold)' },
  { value: 'h2', label: 'Section / Heading 2 (24px Bold)' },
  { value: 'h3', label: 'Sub-heading / Heading 3 (20px)' },
  { value: 'lead', label: 'Large Lead Text (18px)' },
  { value: 'small', label: 'Small Caption Text (13px)' },
];

export const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Write your article content here...',
  minHeight = '320px',
  required = false,
  label = 'Article Content'
}) => {
  const [mode, setMode] = useState('visual'); // 'visual' | 'source' | 'preview'
  const [selectedHighlight, setSelectedHighlight] = useState(HIGHLIGHT_COLORS[0]);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [currentBlock, setCurrentBlock] = useState('p');
  const [showHelpModal, setShowHelpModal] = useState(false);

  const editorRef = useRef(null);
  const savedSelectionRange = useRef(null);

  // Sync external value changes into editor innerHTML safely without resetting cursor
  useEffect(() => {
    if (editorRef.current && mode === 'visual') {
      const currentHtml = editorRef.current.innerHTML;
      if (value !== currentHtml && (value || '') !== (currentHtml || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, mode]);

  // Execute standard formatting commands on the contentEditable area
  const executeCmd = (command, val = null) => {
    if (mode !== 'visual') return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, val);
    handleEditorInput();
  };

  // Dispatch change event to parent
  const handleEditorInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    if (onChange) {
      onChange(html);
    }
  };

  // Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+H)
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        executeCmd('bold');
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        executeCmd('italic');
      } else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        executeCmd('underline');
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        applyHighlight(selectedHighlight);
      }
    }
  };

  // Apply Highlight with specific color class
  const applyHighlight = (hl) => {
    if (mode !== 'visual') return;
    editorRef.current?.focus();
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      // Nothing selected: insert a sample highlighted phrase
      document.execCommand(
        'insertHTML',
        false,
        `<mark class="${hl.class}">highlighted text</mark>&nbsp;`
      );
      handleEditorInput();
      setShowHighlightMenu(false);
      return;
    }

    const range = selection.getRangeAt(0);

    // If already inside a mark, toggle it off
    const existingMark = selection.anchorNode?.parentElement?.closest('mark');
    if (existingMark) {
      const parent = existingMark.parentNode;
      while (existingMark.firstChild) {
        parent.insertBefore(existingMark.firstChild, existingMark);
      }
      parent.removeChild(existingMark);
    } else {
      const mark = document.createElement('mark');
      mark.className = hl.class;
      mark.appendChild(range.extractContents());
      range.insertNode(mark);

      // Re-select mark
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNode(mark);
      selection.addRange(newRange);
    }

    handleEditorInput();
    setShowHighlightMenu(false);
  };

  // Apply Font Size or Heading Level
  const handleBlockChange = (tag) => {
    setCurrentBlock(tag);
    if (mode !== 'visual') return;
    editorRef.current?.focus();

    if (tag === 'lead') {
      // Large text
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'text-xl leading-relaxed font-normal';
        span.style.fontSize = '1.25rem';
        span.appendChild(range.extractContents());
        range.insertNode(span);
        handleEditorInput();
      } else {
        document.execCommand('formatBlock', false, '<p>');
      }
      return;
    }

    if (tag === 'small') {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const small = document.createElement('small');
        small.className = 'text-sm text-slate-400';
        small.appendChild(range.extractContents());
        range.insertNode(small);
        handleEditorInput();
      } else {
        document.execCommand('formatBlock', false, '<small>');
      }
      return;
    }

    // Standard h1, h2, h3, p
    document.execCommand('formatBlock', false, `<${tag}>`);
    handleEditorInput();
  };

  // Underline Title Template
  const insertUnderlinedTitle = () => {
    if (mode !== 'visual') return;
    editorRef.current?.focus();
    const html = `<h2><u>Section Title Here</u></h2><p>Write your detailed section content here...</p>`;
    document.execCommand('insertHTML', false, html);
    handleEditorInput();
  };

  // Open Link Modal
  const openLinkDialog = () => {
    if (mode !== 'visual') return;
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRange.current = selection.getRangeAt(0).cloneRange();
      const text = selection.toString();
      setLinkText(text);
    } else {
      savedSelectionRange.current = null;
      setLinkText('');
    }
    setLinkUrl('');
    setShowLinkModal(true);
  };

  // Submit Link
  const submitLink = () => {
    if (!linkUrl) {
      setShowLinkModal(false);
      return;
    }
    const cleanUrl = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('/')
      ? linkUrl
      : `https://${linkUrl}`;

    editorRef.current?.focus();

    if (savedSelectionRange.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelectionRange.current);
    }

    const text = linkText.trim() || cleanUrl;
    const linkHtml = `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-teal-400 underline hover:text-teal-300 font-medium">${text}</a>&nbsp;`;
    document.execCommand('insertHTML', false, linkHtml);
    handleEditorInput();
    setShowLinkModal(false);
  };

  // Calculate statistics (word count, reading time)
  const calculateStats = () => {
    const temp = document.createElement('div');
    temp.innerHTML = value || '';
    const text = temp.textContent || temp.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const readMinutes = Math.max(1, Math.round(words / 200));
    return { words, chars, readMinutes };
  };

  const stats = calculateStats();

  return (
    <div className="w-full border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-[#00A39C] transition-all bg-white shadow-sm">
      {/* Top Header: Label & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 gap-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <span className="text-xs bg-teal-50 text-teal-700 font-medium px-2 py-0.5 rounded-full border border-teal-200">
            Rich Formatter
          </span>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              mode === 'visual'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Visual WYSIWYG Editor"
          >
            <FaPen className="text-teal-600" /> Visual
          </button>
          <button
            type="button"
            onClick={() => setMode('source')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              mode === 'source'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Raw HTML Source Editor"
          >
            <FaFileCode className="text-indigo-600" /> HTML Code
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              mode === 'preview'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Live Article Preview"
          >
            <FaEye className="text-amber-600" /> Live Preview
          </button>
        </div>
      </div>

      {/* Formatting Toolbar (Only in visual mode) */}
      {mode === 'visual' && (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100/70 border-b border-slate-200 text-slate-700">
          {/* Font / Heading Size Dropdown */}
          <div className="flex items-center mr-1">
            <FaHeading className="text-slate-400 text-xs ml-1 mr-1.5 hidden sm:inline" />
            <select
              value={currentBlock}
              onChange={(e) => handleBlockChange(e.target.value)}
              className="text-xs font-medium bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-[#00A39C] hover:border-slate-400 cursor-pointer shadow-xs"
              title="Change Font / Heading Size"
            >
              {FONT_SIZES.map((fs) => (
                <option key={fs.value} value={fs.value}>
                  {fs.label}
                </option>
              ))}
            </select>
          </div>

          <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => executeCmd('bold')}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1 transition-colors"
            title="Bold (Ctrl+B)"
          >
            <FaBold />
          </button>

          {/* Underline (Requested by User) */}
          <button
            type="button"
            onClick={() => executeCmd('underline')}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded hover:bg-teal-100 text-teal-800 hover:text-teal-900 text-xs font-medium flex items-center gap-1 border border-teal-200/60 bg-teal-50/50 transition-colors shadow-2xs"
            title="Underline Titles & Text (Ctrl+U)"
          >
            <FaUnderline className="text-teal-600" />
            <span className="hidden md:inline font-semibold">Underline</span>
          </button>

          {/* Highlight with Color Picker (Requested by User) */}
          <div className="relative">
            <div className="flex items-center rounded border border-amber-300/80 bg-amber-50/60 shadow-2xs overflow-hidden">
              <button
                type="button"
                onClick={() => applyHighlight(selectedHighlight)}
                className="px-2 py-1.5 hover:bg-amber-100 text-amber-900 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title={`Highlight selected text (${selectedHighlight.label}) - Ctrl+H`}
              >
                <FaHighlighter style={{ color: selectedHighlight.color }} />
                <span className="font-semibold hidden lg:inline">Highlight</span>
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: selectedHighlight.color }}
                />
              </button>
              <button
                type="button"
                onClick={() => setShowHighlightMenu(!showHighlightMenu)}
                className="px-1.5 py-1.5 hover:bg-amber-200/70 text-amber-900 text-2xs border-l border-amber-300/60"
                title="Choose highlight color"
              >
                ▼
              </button>
            </div>

            {/* Highlight color dropdown */}
            {showHighlightMenu && (
              <div className="absolute top-full left-0 mt-1 z-30 bg-white border border-slate-200 rounded-lg shadow-xl p-2 w-48 space-y-1">
                <p className="text-2xs font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5">
                  Highlight Color
                </p>
                {HIGHLIGHT_COLORS.map((hl) => (
                  <button
                    key={hl.id}
                    type="button"
                    onClick={() => {
                      setSelectedHighlight(hl);
                      applyHighlight(hl);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: hl.color }}
                      />
                      <span>{hl.label}</span>
                    </div>
                    {selectedHighlight.id === hl.id && <FaCheck className="text-xs text-teal-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Italic */}
          <button
            type="button"
            onClick={() => executeCmd('italic')}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Italic (Ctrl+I)"
          >
            <FaItalic />
          </button>

          {/* Strikethrough */}
          <button
            type="button"
            onClick={() => executeCmd('strikeThrough')}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Strikethrough"
          >
            <FaStrikethrough />
          </button>

          <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => executeCmd('insertUnorderedList')}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Bulleted List"
          >
            <FaListUl />
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => executeCmd('insertOrderedList')}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Numbered List"
          >
            <FaListOl />
          </button>

          {/* Quote Block */}
          <button
            type="button"
            onClick={() => executeCmd('formatBlock', '<blockquote>')}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Blockquote"
          >
            <FaQuoteLeft />
          </button>

          {/* Code */}
          <button
            type="button"
            onClick={() => {
              const selection = window.getSelection();
              if (selection && !selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                const code = document.createElement('code');
                code.className = 'bg-slate-100 text-teal-700 px-1.5 py-0.5 rounded font-mono text-xs';
                code.appendChild(range.extractContents());
                range.insertNode(code);
                handleEditorInput();
              } else {
                document.execCommand(
                  'insertHTML',
                  false,
                  `<pre class="bg-slate-900 text-sky-300 p-3 rounded-lg font-mono text-xs overflow-x-auto"><code>// code block here</code></pre><p><br></p>`
                );
                handleEditorInput();
              }
            }}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Code Snippet / Block"
          >
            <FaCode />
          </button>

          {/* Link */}
          <button
            type="button"
            onClick={openLinkDialog}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Insert Link"
          >
            <FaLink />
          </button>

          {/* Divider */}
          <button
            type="button"
            onClick={() => executeCmd('insertHorizontalRule')}
            className="p-1.5 sm:px-2 rounded hover:bg-slate-200 text-slate-700 text-xs transition-colors"
            title="Horizontal Divider"
          >
            <FaMinus />
          </button>

          {/* Quick Preset: Underlined Title Template */}
          <button
            type="button"
            onClick={insertUnderlinedTitle}
            className="hidden xl:inline-flex items-center gap-1 px-2 py-1 text-2xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded hover:bg-teal-100 transition-colors"
            title="Insert Pre-styled Underlined Section Title"
          >
            + Underlined Title
          </button>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => executeCmd('removeFormat')}
            className="p-1.5 sm:px-2 rounded hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-xs ml-auto transition-colors"
            title="Clear Formatting"
          >
            <FaEraser />
          </button>

          {/* Help Shortcuts */}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 text-xs transition-colors"
            title="Keyboard Shortcuts & Tips"
          >
            <FaInfoCircle />
          </button>
        </div>
      )}

      {/* Editor Body */}
      <div className="relative">
        {/* Visual WYSIWYG Mode */}
        {mode === 'visual' && (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onKeyDown={handleKeyDown}
            data-placeholder={placeholder}
            className="article-editor-editable p-4 sm:p-5 focus:outline-none overflow-y-auto text-slate-800 leading-relaxed font-normal min-h-[320px]"
            style={{ minHeight }}
          />
        )}

        {/* HTML Source Mode */}
        {mode === 'source' && (
          <div className="p-3 bg-slate-900 font-mono text-xs">
            <div className="flex justify-between items-center text-2xs text-slate-400 mb-2 pb-1 border-b border-slate-800">
              <span>Raw HTML Editor</span>
              <span>Edit tags directly: &lt;h1&gt;, &lt;u&gt;, &lt;mark&gt;, &lt;b&gt;</span>
            </div>
            <textarea
              value={value || ''}
              onChange={(e) => onChange && onChange(e.target.value)}
              placeholder="Paste or write HTML here..."
              rows={14}
              className="w-full bg-slate-950 text-emerald-400 p-3 rounded font-mono text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 resize-y leading-relaxed border border-slate-800"
              style={{ minHeight }}
            />
          </div>
        )}

        {/* Live Preview Mode */}
        {mode === 'preview' && (
          <div className="p-6 bg-slate-950 text-slate-100 min-h-[320px] overflow-y-auto" style={{ minHeight }}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                    Live Article View (Reader Theme)
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {stats.words} words • ~{stats.readMinutes} min read
                </span>
              </div>

              {value ? (
                <ArticleContentRenderer content={value} />
              ) : (
                <div className="text-center py-12 text-slate-500 font-mono text-sm">
                  (No content written yet. Switch to Visual mode to start writing!)
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer: Stats & Shortcuts */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span>
            <strong>{stats.words}</strong> words
          </span>
          <span>
            <strong>{stats.chars}</strong> chars
          </span>
          <span className="hidden sm:inline">
            ~<strong>{stats.readMinutes}</strong> min read
          </span>
        </div>

        <div className="flex items-center gap-3 text-2xs text-slate-400">
          <span className="hidden sm:inline">
            <kbd className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-700">Ctrl+B</kbd> Bold
          </span>
          <span className="hidden sm:inline">
            <kbd className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-700">Ctrl+U</kbd> Underline
          </span>
          <span className="hidden sm:inline">
            <kbd className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-700">Ctrl+H</kbd> Highlight
          </span>
        </div>
      </div>

      {/* Link Dialog Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <FaLink className="text-teal-600" /> Insert Hyperlink
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Link Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Google Antigravity Documentation"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitLink}
                className="px-4 py-2 text-sm bg-[#00A39C] hover:bg-[#008a83] text-white font-semibold rounded-lg shadow-sm"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <FaInfoCircle className="text-teal-600" /> Rich Text Formatting Guide
              </h4>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed mb-5">
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                <p className="font-semibold text-teal-900 mb-1">✨ Requested Features:</p>
                <ul className="list-disc pl-4 space-y-1 text-teal-800">
                  <li><strong>Highlight:</strong> Select any text and click <span className="bg-amber-200 text-amber-900 px-1 rounded">Highlight</span> or press <code>Ctrl+H</code>. Choose from 5 vibrant neon colors.</li>
                  <li><strong>Underline:</strong> Select any text or heading and click <u>Underline</u> or press <code>Ctrl+U</code> for an editorial cyan accent underline.</li>
                  <li><strong>Bold:</strong> Click <strong>Bold</strong> or press <code>Ctrl+B</code> to emphasize key points.</li>
                  <li><strong>Letter / Font Size:</strong> Select any block and pick from Title (H1), Section (H2), Sub-heading (H3), Large Lead, or Normal text.</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                <p className="font-semibold text-slate-800">Keyboard Shortcuts:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div><code>Ctrl + B</code> : Bold</div>
                  <div><code>Ctrl + U</code> : Underline</div>
                  <div><code>Ctrl + I</code> : Italic</div>
                  <div><code>Ctrl + H</code> : Highlight</div>
                </div>
              </div>

              <p className="text-slate-500">
                You can switch between <strong>Visual</strong>, <strong>HTML Code</strong>, and <strong>Live Preview</strong> anytime without losing your work.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;

// Editor Module using CodeMirror
class EditorModule {
  constructor() {
    this.editor = null;
    this.currentFilePath = null;
    this.isModified = false;
    this.init();
  }

  init() {
    // For now, create a simple textarea-based editor
    // In production, this would use CodeMirror 6
    const editorContainer = document.getElementById('editor');
    
    const textarea = document.createElement('textarea');
    textarea.id = 'editor-textarea';
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.padding = '20px';
    textarea.style.backgroundColor = 'var(--bg-primary)';
    textarea.style.color = 'var(--text-primary)';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.fontFamily = "'Courier New', monospace";
    textarea.style.fontSize = '14px';
    textarea.style.lineHeight = '1.6';
    
    editorContainer.appendChild(textarea);
    this.editor = textarea;

    // Listen for changes
    this.editor.addEventListener('input', () => {
      this.isModified = true;
      this.updatePreview();
    });
  }

  getContent() {
    return this.editor.value;
  }

  setContent(content) {
    this.editor.value = content;
    this.isModified = false;
    this.updatePreview();
  }

  async openFile() {
    const result = await window.electronAPI.openFileDialog();
    if (result.success) {
      const fileResult = await window.electronAPI.readFile(result.filePath);
      if (fileResult.success) {
        this.setContent(fileResult.content);
        this.currentFilePath = result.filePath;
        console.log('File opened:', result.filePath);
      } else {
        alert('Error reading file: ' + fileResult.error);
      }
    }
  }

  async saveFile() {
    if (!this.currentFilePath) {
      return this.saveFileAs();
    }

    const result = await window.electronAPI.writeFile(
      this.currentFilePath,
      this.getContent()
    );

    if (result.success) {
      this.isModified = false;
      console.log('File saved:', this.currentFilePath);
    } else {
      alert('Error saving file: ' + result.error);
    }
  }

  async saveFileAs() {
    const result = await window.electronAPI.saveFileDialog();
    if (result.success) {
      this.currentFilePath = result.filePath;
      return this.saveFile();
    }
  }

  newFile() {
    if (this.isModified) {
      const confirm = window.confirm('You have unsaved changes. Continue?');
      if (!confirm) return;
    }
    this.setContent('');
    this.currentFilePath = null;
  }

  updatePreview() {
    const previewContent = document.getElementById('preview-content');
    if (!previewContent) return;

    const content = this.getContent();
    
    // Simple markdown-like rendering
    let html = content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');

    previewContent.innerHTML = html;
  }
}

// Export for use in app.js
window.EditorModule = EditorModule;


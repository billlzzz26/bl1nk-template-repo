// Main Application Controller
class App {
  constructor() {
    this.editor = null;
    this.canvas = null;
    this.templater = null;
    this.aiAssistant = null;
    this.settings = null;
    this.init();
  }

  init() {
    console.log('Initializing AI Creative Editor...');

    // Initialize modules
    this.settings = new SettingsModule();
    this.editor = new EditorModule();
    this.canvas = new CanvasModule();
    this.templater = new TemplaterModule(this.editor);
    this.aiAssistant = new AIAssistantModule(this.editor);

    // Setup UI event handlers
    this.setupUIHandlers();

    console.log('AI Creative Editor initialized successfully');
  }

  setupUIHandlers() {
    // File operations
    document.getElementById('new-file-btn').addEventListener('click', () => {
      this.editor.newFile();
    });

    document.getElementById('open-file-btn').addEventListener('click', () => {
      this.editor.openFile();
    });

    document.getElementById('save-file-btn').addEventListener('click', () => {
      this.editor.saveFile();
    });

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const viewName = tab.dataset.view;
        this.switchView(viewName);
      });
    });

    // Plugin buttons
    document.getElementById('canvas-btn').addEventListener('click', () => {
      this.switchView('canvas');
    });

    document.getElementById('templater-btn').addEventListener('click', () => {
      this.openPanel('templater');
    });

    document.getElementById('ai-assistant-btn').addEventListener('click', () => {
      this.openPanel('ai-assistant');
    });

    // Close panel button
    document.getElementById('close-panel-btn').addEventListener('click', () => {
      this.closePanel();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.editor.saveFile();
      }

      // Ctrl/Cmd + O: Open
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        this.editor.openFile();
      }

      // Ctrl/Cmd + N: New
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        this.editor.newFile();
      }

      // Ctrl/Cmd + ,: Settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        this.settings.openSettings();
      }
    });
  }

  switchView(viewName) {
    // Remove active class from all views and tabs
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });

    // Add active class to selected view and tab
    const view = document.getElementById(`${viewName}-view`);
    const tab = document.querySelector(`.tab[data-view="${viewName}"]`);
    
    if (view) view.classList.add('active');
    if (tab) tab.classList.add('active');

    // Special handling for canvas view
    if (viewName === 'canvas') {
      // Trigger canvas render after view is visible
      setTimeout(() => {
        this.canvas.render();
      }, 100);
    }
  }

  openPanel(panelType) {
    const rightPanel = document.getElementById('right-panel');
    const panelTitle = document.getElementById('panel-title');
    
    // Hide all panel sections
    document.querySelectorAll('.panel-section').forEach(section => {
      section.classList.remove('active');
    });

    // Show selected panel section
    if (panelType === 'ai-assistant') {
      panelTitle.textContent = 'AI Assistant';
      document.getElementById('ai-assistant-content').classList.add('active');
    } else if (panelType === 'templater') {
      panelTitle.textContent = 'Templater';
      document.getElementById('templater-content').classList.add('active');
    }

    // Show panel
    rightPanel.classList.remove('hidden');
  }

  closePanel() {
    document.getElementById('right-panel').classList.add('hidden');
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});


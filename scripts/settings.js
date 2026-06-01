// Settings Module - Manage app settings and AI providers
class SettingsModule {
  constructor() {
    this.settings = {
      providers: [],
      theme: 'dark',
      fontSize: 14
    };
    this.init();
  }

  async init() {
    // Load settings
    await this.loadSettings();

    // Settings button
    document.getElementById('settings-btn').addEventListener('click', () => {
      this.openSettings();
    });

    // Close settings button
    document.getElementById('close-settings-btn').addEventListener('click', () => {
      this.closeSettings();
    });

    // Save settings button
    document.getElementById('save-settings-btn').addEventListener('click', () => {
      this.saveSettings();
    });

    // Add provider button
    document.getElementById('add-provider-btn').addEventListener('click', () => {
      this.openProviderModal();
    });

    // Close provider modal button
    document.getElementById('close-provider-btn').addEventListener('click', () => {
      this.closeProviderModal();
    });

    // Save provider button
    document.getElementById('save-provider-btn').addEventListener('click', () => {
      this.addProvider();
    });

    // Theme select
    document.getElementById('theme-select').addEventListener('change', (e) => {
      this.settings.theme = e.target.value;
    });

    // Font size input
    document.getElementById('font-size-input').addEventListener('change', (e) => {
      this.settings.fontSize = parseInt(e.target.value);
    });
  }

  async loadSettings() {
    const result = await window.electronAPI.loadSettings();
    if (result.success) {
      this.settings = result.settings;
      this.applySettings();
    }
  }

  applySettings() {
    // Apply theme
    document.getElementById('theme-select').value = this.settings.theme;

    // Apply font size
    document.getElementById('font-size-input').value = this.settings.fontSize;
    const editor = document.getElementById('editor-textarea');
    if (editor) {
      editor.style.fontSize = `${this.settings.fontSize}px`;
    }

    // Render providers list
    this.renderProvidersList();
  }

  async saveSettings() {
    const result = await window.electronAPI.saveSettings(this.settings);
    if (result.success) {
      this.applySettings();
      this.closeSettings();
      console.log('Settings saved successfully');
    } else {
      alert('Error saving settings: ' + result.error);
    }
  }

  openSettings() {
    document.getElementById('settings-modal').classList.remove('hidden');
    this.renderProvidersList();
  }

  closeSettings() {
    document.getElementById('settings-modal').classList.add('hidden');
  }

  openProviderModal() {
    document.getElementById('provider-modal').classList.remove('hidden');
  }

  closeProviderModal() {
    document.getElementById('provider-modal').classList.add('hidden');
    // Clear inputs
    document.getElementById('provider-type-select').value = 'openai';
    document.getElementById('provider-api-key-input').value = '';
    document.getElementById('provider-model-input').value = '';
  }

  addProvider() {
    const type = document.getElementById('provider-type-select').value;
    const apiKey = document.getElementById('provider-api-key-input').value.trim();
    const model = document.getElementById('provider-model-input').value.trim();

    if (!apiKey) {
      alert('Please enter an API key');
      return;
    }

    const provider = {
      id: Date.now(),
      type: type,
      apiKey: apiKey,
      model: model || this.getDefaultModel(type),
      name: this.getProviderName(type)
    };

    this.settings.providers.push(provider);
    this.renderProvidersList();
    this.closeProviderModal();
  }

  removeProvider(providerId) {
    if (confirm('Remove this provider?')) {
      this.settings.providers = this.settings.providers.filter(
        p => p.id !== providerId
      );
      this.renderProvidersList();
    }
  }

  getProviderName(type) {
    const names = {
      'openai': 'OpenAI',
      'anthropic': 'Anthropic (Claude)',
      'google': 'Google AI (Gemini)'
    };
    return names[type] || type;
  }

  getDefaultModel(type) {
    const defaults = {
      'openai': 'gpt-3.5-turbo',
      'anthropic': 'claude-3-sonnet-20240229',
      'google': 'gemini-pro'
    };
    return defaults[type] || '';
  }

  renderProvidersList() {
    const providersList = document.getElementById('providers-list');
    providersList.innerHTML = '';

    if (this.settings.providers.length === 0) {
      providersList.innerHTML = '<p style="color: var(--text-secondary);">No providers configured</p>';
      return;
    }

    for (const provider of this.settings.providers) {
      const item = document.createElement('div');
      item.className = 'provider-item';

      const info = document.createElement('div');
      info.className = 'provider-info';

      const name = document.createElement('h4');
      name.textContent = provider.name;

      const details = document.createElement('p');
      details.textContent = `Model: ${provider.model}`;

      info.appendChild(name);
      info.appendChild(details);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-provider-btn';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeProvider(provider.id);
      });

      item.appendChild(info);
      item.appendChild(removeBtn);

      providersList.appendChild(item);
    }
  }
}

// Export for use in app.js
window.SettingsModule = SettingsModule;


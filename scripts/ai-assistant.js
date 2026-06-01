// AI Assistant Module - Multi-provider AI integration
class AIAssistantModule {
  constructor(editorModule) {
    this.editorModule = editorModule;
    this.messages = [];
    this.currentProvider = null;
    this.init();
  }

  init() {
    // Send chat button
    document.getElementById('send-chat-btn').addEventListener('click', () => {
      this.sendMessage();
    });

    // Enter key in chat input
    document.getElementById('chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        this.sendMessage();
      }
    });
  }

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to chat
    this.addMessageToChat('user', message);
    input.value = '';

    // Get current settings
    const settingsResult = await window.electronAPI.loadSettings();
    if (!settingsResult.success || !settingsResult.settings.providers || 
        settingsResult.settings.providers.length === 0) {
      this.addMessageToChat('assistant', 'Please configure an AI provider in Settings first.');
      return;
    }

    // Use the first provider (in production, allow user to select)
    const provider = settingsResult.settings.providers[0];
    this.currentProvider = provider;

    // Prepare messages for API
    const apiMessages = this.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Show loading indicator
    const loadingId = this.addMessageToChat('assistant', 'Thinking...');

    try {
      // Call AI API
      const result = await window.electronAPI.callAIAPI({
        provider: provider.type,
        apiKey: provider.apiKey,
        model: provider.model,
        messages: apiMessages
      });

      // Remove loading indicator
      this.removeMessage(loadingId);

      if (result.success) {
        this.addMessageToChat('assistant', result.data);
      } else {
        this.addMessageToChat('assistant', `Error: ${result.error}`);
      }
    } catch (error) {
      this.removeMessage(loadingId);
      this.addMessageToChat('assistant', `Error: ${error.message}`);
    }
  }

  addMessageToChat(role, content) {
    const messageId = Date.now();
    
    // Add to messages array
    this.messages.push({
      id: messageId,
      role: role,
      content: content
    });

    // Add to UI
    const chatMessages = document.getElementById('chat-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}`;
    messageDiv.dataset.messageId = messageId;
    messageDiv.textContent = content;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageId;
  }

  removeMessage(messageId) {
    // Remove from array
    this.messages = this.messages.filter(msg => msg.id !== messageId);

    // Remove from UI
    const messageDiv = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageDiv) {
      messageDiv.remove();
    }
  }

  clearChat() {
    this.messages = [];
    document.getElementById('chat-messages').innerHTML = '';
  }

  // Quick actions
  async summarizeDocument() {
    const content = this.editorModule.getContent();
    if (!content) {
      alert('Editor is empty');
      return;
    }

    document.getElementById('chat-input').value = 
      `Please summarize the following document:\n\n${content}`;
    
    this.sendMessage();
  }

  async improveWriting() {
    const content = this.editorModule.getContent();
    if (!content) {
      alert('Editor is empty');
      return;
    }

    document.getElementById('chat-input').value = 
      `Please improve the writing quality of the following text:\n\n${content}`;
    
    this.sendMessage();
  }

  async generateIdeas() {
    const content = this.editorModule.getContent();
    
    let prompt = 'Please generate creative ideas for ';
    if (content) {
      prompt += `the following topic:\n\n${content}`;
    } else {
      const topic = prompt('What topic would you like ideas for?');
      if (!topic) return;
      prompt += topic;
    }

    document.getElementById('chat-input').value = prompt;
    this.sendMessage();
  }
}

// Export for use in app.js
window.AIAssistantModule = AIAssistantModule;


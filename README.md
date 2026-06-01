# AI Creative Editor

AI-powered creative editor with Canvas and Templater plugins, works offline like Obsidian combined with Cursor.

## Features

### Core Features
- **Markdown Editor**: Full-featured markdown editor with syntax highlighting
- **Works Offline**: All core features work without AI connectivity
- **Multi-Provider AI Integration**: Support for OpenAI, Anthropic (Claude), and Google AI (Gemini)
- **Bring Your Own API Key**: Use your own API keys from multiple providers

### Plugins

#### Canvas Plugin
- Visual workspace for organizing notes and ideas
- Create interconnected note cards
- Drag and drop interface
- Link notes together to visualize relationships
- Perfect for brainstorming and mind mapping

#### Templater Plugin
- Pre-built templates for common use cases:
  - Daily Notes
  - Meeting Notes
  - Project Plans
- Create custom templates from your content
- Dynamic variable replacement (date, time, etc.)
- Quick template insertion

#### AI Assistant
- Multi-provider support (OpenAI, Anthropic, Google AI)
- Context-aware conversations
- Document summarization
- Writing improvement suggestions
- Creative idea generation

## Installation

### Prerequisites
- Node.js 18+ or 22+
- npm or pnpm

### Setup

1. Clone or extract the project:
```bash
cd ai-creative-editor
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm start
```

## Building

To build the application for distribution:

```bash
npm run build
```

This will create distributable packages in the `dist` folder for your platform.

## Usage

### Getting Started

1. **Configure AI Providers** (Optional):
   - Click the Settings button (⚙️) in the sidebar
   - Click "Add Provider"
   - Select your provider (OpenAI, Anthropic, or Google AI)
   - Enter your API key
   - Optionally specify a model

2. **Create a New Document**:
   - Click "New File" or press `Ctrl/Cmd + N`
   - Start typing in the editor

3. **Use Templates**:
   - Click the "Templater" button in the sidebar
   - Select a template from the list
   - The template will be inserted into the editor

4. **Use Canvas**:
   - Click the "Canvas" tab or button
   - Click "Add Note" to create note cards
   - Double-click notes to edit them
   - Drag notes to arrange them
   - Select a note and click "Add Link", then click another note to connect them

5. **Use AI Assistant**:
   - Click the "AI Assistant" button in the sidebar
   - Type your question or request
   - Press "Send" or `Ctrl + Enter`

### Keyboard Shortcuts

- `Ctrl/Cmd + N`: New file
- `Ctrl/Cmd + O`: Open file
- `Ctrl/Cmd + S`: Save file
- `Ctrl/Cmd + ,`: Open settings

## Architecture

### Technology Stack
- **Electron**: Cross-platform desktop application framework
- **JavaScript**: Core application logic
- **HTML/CSS**: User interface
- **Node.js**: Backend file operations and API calls

### Project Structure
```
ai-creative-editor/
├── main.js              # Electron main process
├── preload.js           # Electron preload script
├── index.html           # Main UI
├── package.json         # Project configuration
├── styles/
│   └── main.css         # Application styles
├── scripts/
│   ├── app.js           # Main application controller
│   ├── editor.js        # Editor module
│   ├── canvas.js        # Canvas plugin
│   ├── templater.js     # Templater plugin
│   ├── ai-assistant.js  # AI Assistant module
│   └── settings.js      # Settings module
└── assets/              # Application assets
```

## AI Provider Configuration

### OpenAI
- Provider: `openai`
- Default Model: `gpt-3.5-turbo`
- API Key: Get from https://platform.openai.com/api-keys

### Anthropic (Claude)
- Provider: `anthropic`
- Default Model: `claude-3-sonnet-20240229`
- API Key: Get from https://console.anthropic.com/

### Google AI (Gemini)
- Provider: `google`
- Default Model: `gemini-pro`
- API Key: Get from https://makersuite.google.com/app/apikey

## Privacy & Security

- **No Data Collection**: This application does not collect or store any user data
- **Direct API Calls**: AI requests are sent directly to your chosen provider
- **Local Storage**: All settings and API keys are stored locally on your device
- **API Key Security**: API keys are stored in your local application data folder

## Development

### Running in Development Mode

```bash
# Set development mode
export NODE_ENV=development

# Run the app
npm start
```

This will open the DevTools automatically for debugging.

### Customization

You can customize the editor by modifying:
- **Styles**: Edit `styles/main.css`
- **Templates**: Modify `scripts/templater.js`
- **Canvas Behavior**: Edit `scripts/canvas.js`
- **AI Integration**: Customize `scripts/ai-assistant.js`

## Troubleshooting

### AI Assistant not working
- Make sure you have configured at least one AI provider in Settings
- Verify your API key is correct
- Check your internet connection

### Canvas not rendering
- Try switching to another tab and back to Canvas
- Resize the window to trigger a re-render

### File operations not working
- Check file permissions
- Ensure you have write access to the selected directory

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use this project for any purpose.

## Credits

Inspired by:
- [Obsidian](https://obsidian.md/) - For the plugin system and canvas concept
- [Cursor](https://cursor.sh/) - For AI-powered editing features
- [VSCode](https://code.visualstudio.com/) - For editor architecture
- [voideditor/void](https://github.com/voideditor/void) - For open-source AI editor inspiration

## Support

For issues, questions, or suggestions, please open an issue on the project repository.


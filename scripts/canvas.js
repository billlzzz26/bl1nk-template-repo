// Canvas Module - Visual workspace for notes and connections
class CanvasModule {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.notes = [];
    this.connections = [];
    this.selectedNote = null;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.init();
  }

  init() {
    const container = document.getElementById('canvas-container');
    
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'main-canvas';
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    this.canvas.style.display = 'block';
    
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Setup event listeners
    this.setupEventListeners();

    // Initial render
    this.render();

    // Handle window resize
    window.addEventListener('resize', () => {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      this.render();
    });
  }

  setupEventListeners() {
    // Add note button
    document.getElementById('add-note-btn').addEventListener('click', () => {
      this.addNote();
    });

    // Add link button
    document.getElementById('add-link-btn').addEventListener('click', () => {
      if (this.selectedNote) {
        alert('Click on another note to create a connection');
        this.linkMode = true;
      } else {
        alert('Please select a note first');
      }
    });

    // Clear canvas button
    document.getElementById('clear-canvas-btn').addEventListener('click', () => {
      if (confirm('Clear all notes and connections?')) {
        this.notes = [];
        this.connections = [];
        this.render();
      }
    });

    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
  }

  addNote(x = null, y = null) {
    const note = {
      id: Date.now(),
      x: x || Math.random() * (this.canvas.width - 200) + 100,
      y: y || Math.random() * (this.canvas.height - 150) + 75,
      width: 200,
      height: 150,
      title: 'New Note',
      content: 'Double-click to edit',
      color: '#2d2d30'
    };

    this.notes.push(note);
    this.render();
  }

  handleMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on a note
    for (let i = this.notes.length - 1; i >= 0; i--) {
      const note = this.notes[i];
      if (x >= note.x && x <= note.x + note.width &&
          y >= note.y && y <= note.y + note.height) {
        
        if (this.linkMode && this.selectedNote && this.selectedNote !== note) {
          // Create connection
          this.connections.push({
            from: this.selectedNote.id,
            to: note.id
          });
          this.linkMode = false;
          this.render();
          return;
        }

        this.selectedNote = note;
        this.isDragging = true;
        this.dragOffset.x = x - note.x;
        this.dragOffset.y = y - note.y;
        
        // Move note to front
        this.notes.splice(i, 1);
        this.notes.push(note);
        
        this.render();
        return;
      }
    }

    // Clicked on empty space
    this.selectedNote = null;
    this.render();
  }

  handleMouseMove(e) {
    if (!this.isDragging || !this.selectedNote) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.selectedNote.x = x - this.dragOffset.x;
    this.selectedNote.y = y - this.dragOffset.y;

    this.render();
  }

  handleMouseUp(e) {
    this.isDragging = false;
  }

  handleDoubleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if double-clicking on a note
    for (const note of this.notes) {
      if (x >= note.x && x <= note.x + note.width &&
          y >= note.y && y <= note.y + note.height) {
        
        const newTitle = prompt('Note title:', note.title);
        if (newTitle !== null) {
          note.title = newTitle;
        }

        const newContent = prompt('Note content:', note.content);
        if (newContent !== null) {
          note.content = newContent;
        }

        this.render();
        return;
      }
    }
  }

  render() {
    // Clear canvas
    this.ctx.fillStyle = '#1e1e1e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections
    this.ctx.strokeStyle = '#007acc';
    this.ctx.lineWidth = 2;

    for (const conn of this.connections) {
      const fromNote = this.notes.find(n => n.id === conn.from);
      const toNote = this.notes.find(n => n.id === conn.to);

      if (fromNote && toNote) {
        const fromX = fromNote.x + fromNote.width / 2;
        const fromY = fromNote.y + fromNote.height / 2;
        const toX = toNote.x + toNote.width / 2;
        const toY = toNote.y + toNote.height / 2;

        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();
      }
    }

    // Draw notes
    for (const note of this.notes) {
      // Note background
      this.ctx.fillStyle = note.color;
      this.ctx.fillRect(note.x, note.y, note.width, note.height);

      // Note border
      if (note === this.selectedNote) {
        this.ctx.strokeStyle = '#007acc';
        this.ctx.lineWidth = 3;
      } else {
        this.ctx.strokeStyle = '#3e3e42';
        this.ctx.lineWidth = 1;
      }
      this.ctx.strokeRect(note.x, note.y, note.width, note.height);

      // Note title
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 14px Arial';
      this.ctx.fillText(
        note.title,
        note.x + 10,
        note.y + 25,
        note.width - 20
      );

      // Note content
      this.ctx.fillStyle = '#cccccc';
      this.ctx.font = '12px Arial';
      const lines = this.wrapText(note.content, note.width - 20);
      for (let i = 0; i < Math.min(lines.length, 6); i++) {
        this.ctx.fillText(
          lines[i],
          note.x + 10,
          note.y + 50 + i * 18,
          note.width - 20
        );
      }
    }
  }

  wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = this.ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  exportData() {
    return {
      notes: this.notes,
      connections: this.connections
    };
  }

  importData(data) {
    this.notes = data.notes || [];
    this.connections = data.connections || [];
    this.render();
  }
}

// Export for use in app.js
window.CanvasModule = CanvasModule;


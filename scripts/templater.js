// Templater Module - Template management system
class TemplaterModule {
  constructor(editorModule) {
    this.editorModule = editorModule;
    this.templates = this.getDefaultTemplates();
    this.init();
  }

  init() {
    // Setup template item click handlers
    const templateItems = document.querySelectorAll('.template-item');
    templateItems.forEach(item => {
      item.addEventListener('click', () => {
        const templateId = item.dataset.template;
        this.applyTemplate(templateId);
      });
    });

    // Create template button
    document.getElementById('create-template-btn').addEventListener('click', () => {
      this.createCustomTemplate();
    });
  }

  getDefaultTemplates() {
    return {
      'daily-note': {
        name: 'Daily Note',
        description: 'Create a daily note with date and tasks',
        content: `# Daily Note - {{date}}

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Notes


## Reflections

`
      },
      'meeting-notes': {
        name: 'Meeting Notes',
        description: 'Template for meeting notes with attendees and action items',
        content: `# Meeting Notes - {{date}}

## Meeting Details
- **Date:** {{date}}
- **Time:** {{time}}
- **Attendees:** 

## Agenda


## Discussion Points


## Action Items
- [ ] Action 1 - Assigned to:
- [ ] Action 2 - Assigned to:

## Next Steps

`
      },
      'project-plan': {
        name: 'Project Plan',
        description: 'Project planning template with goals and milestones',
        content: `# Project Plan: {{project_name}}

## Overview


## Goals
1. Goal 1
2. Goal 2
3. Goal 3

## Milestones
- [ ] Milestone 1 - Due: {{date}}
- [ ] Milestone 2 - Due: 
- [ ] Milestone 3 - Due: 

## Resources


## Risks and Mitigation


## Timeline

`
      }
    };
  }

  applyTemplate(templateId) {
    const template = this.templates[templateId];
    if (!template) {
      alert('Template not found');
      return;
    }

    let content = template.content;

    // Replace template variables
    content = this.replaceVariables(content);

    // Insert into editor
    this.editorModule.setContent(content);

    // Close right panel
    document.getElementById('right-panel').classList.add('hidden');

    // Switch to editor view
    this.switchToView('editor');

    console.log('Template applied:', template.name);
  }

  replaceVariables(content) {
    const now = new Date();
    
    const variables = {
      '{{date}}': now.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      '{{time}}': now.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      '{{year}}': now.getFullYear().toString(),
      '{{month}}': (now.getMonth() + 1).toString().padStart(2, '0'),
      '{{day}}': now.getDate().toString().padStart(2, '0'),
      '{{project_name}}': 'New Project'
    };

    let result = content;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(key, 'g'), value);
    }

    return result;
  }

  createCustomTemplate() {
    const name = prompt('Template name:');
    if (!name) return;

    const description = prompt('Template description:');
    if (!description) return;

    const content = this.editorModule.getContent();
    if (!content) {
      alert('Editor is empty. Please add some content first.');
      return;
    }

    const templateId = name.toLowerCase().replace(/\s+/g, '-');
    
    this.templates[templateId] = {
      name: name,
      description: description,
      content: content
    };

    // Add to template list
    this.addTemplateToList(templateId, name, description);

    alert('Template created successfully!');
  }

  addTemplateToList(id, name, description) {
    const templateList = document.getElementById('template-list');
    
    const item = document.createElement('div');
    item.className = 'template-item';
    item.dataset.template = id;
    
    const title = document.createElement('h4');
    title.textContent = name;
    
    const desc = document.createElement('p');
    desc.textContent = description;
    
    item.appendChild(title);
    item.appendChild(desc);
    
    item.addEventListener('click', () => {
      this.applyTemplate(id);
    });
    
    templateList.appendChild(item);
  }

  switchToView(viewName) {
    // Remove active class from all views and tabs
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    // Add active class to selected view and tab
    document.getElementById(`${viewName}-view`).classList.add('active');
    document.querySelector(`.tab[data-view="${viewName}"]`).classList.add('active');
  }

  exportTemplates() {
    return this.templates;
  }

  importTemplates(templates) {
    this.templates = { ...this.templates, ...templates };
    
    // Rebuild template list
    const templateList = document.getElementById('template-list');
    templateList.innerHTML = '';
    
    for (const [id, template] of Object.entries(this.templates)) {
      this.addTemplateToList(id, template.name, template.description);
    }
  }
}

// Export for use in app.js
window.TemplaterModule = TemplaterModule;


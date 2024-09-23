const GRBASCZ = `<grbas></grbas>`; 

 export const grbasgjs = (editor, options) => {
  editor.DomComponents.addType('grbas', {
    // Make the editor understand when to bind `my-input-type`
  isComponent: el => el.tagName === 'GRBAS',
  model: {
    defaults: {
      // The tag name that will be used in the final code
      tagName: 'grbas',
      droppable:false,
      attributes: { 
        title: 'task title',
        description:'task description',
      },
      // You would use traits to customize custom properties
      traits: [
        'title',
        'description',                
      ]
    }
  },
  view: {
    // eg. You can customize the tag in the canvas
    // By default, the view will use the same tag of the model
    tagName: 'div',
    onRender() {
      // What the user see in the canvas is totally up to you
      // it can be a simple image as a placeholder or
      // you can make it as much close to the original markup
      const attrs = this.model.getAttributes();
      this.el.innerHTML = `<div class="grbas">
        My custom HTML for grbas component<br>
        title:  ${attrs['title']} description:  ${attrs['description']}
      </div>`;
    }
  }
});   

        editor.BlockManager.add('grbas', {
          label: 'GRBAS',
          category: 'PAVE',
          content: GRBASCZ,
        }, {at:0});
      }

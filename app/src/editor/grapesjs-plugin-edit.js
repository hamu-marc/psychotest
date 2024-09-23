const EDIT = `<taskedit title="hodnotte slovne zvuk" color="w3-pale-green"></taskedit>`;
const EDITPREVIEW = `
<fieldset class="%COLOR%">
 <legend>%TITLE%</legend>  
<textarea></textarea>
</fieldset>
`;

export const taskeditgjs = (editor, options) => {
editor.DomComponents.addType('taskedit', {
    isComponent: el => {
        return el.tagName === 'TASKEDIT';
    },

    model: {
        defaults: {
            tagName: 'taskedit',
            droppable: false,  // Prevents dropping other components inside
            traits: [                
                // List of UI inputs to edit attributes of the tag
                { name: 'title', label: 'Title', type: 'text'},
                { name: 'color', label: 'Color', type: 'select', options:['','w3-white','w3-pale-red','w3-pale-green','w3-pale-yellow','w3-pale-blue','w3-sand','w3-light-gray'] }
            ],

            // Define the properties that should be reflected in the HTML
            attributes: {
                'title': '',
                'color': 'w3-pale-green'
            },
             // Add default style to the component
          style: {
            //display: 'inline-block', // Default style
          }
        },
        // Listen for changes to the 'preset' trait
        init() {            
            this.listenTo(this, 'change:attributes:title', this.handleAttributeChange);
            this.listenTo(this, 'change:attributes:color', this.handleAttributeChange);
        },

    // Handle attribute changes
    handleAttributeChange() {
        //console.log('grapesjs taskscale handleAttributeChange()');
        const title = this.getAttributes().title;
        const color = this.getAttributes().color;
        
        const view = this.view;
        if (view) {
            view.updatePreview({ title, color});
        }                
    }
    },

    view: {
        // Optionally, define how the component should be updated on attribute change
        onRender: function () {  
            const attrs = this.model.getAttributes();
            this.updatePreview(attrs);            
        },
        updatePreview(attrs) {
            const title = attrs.title || 'title';
            const color = attrs.color || 'w3-pale-green';
            let html = EDITPREVIEW.replace('%TITLE%', title).replace('%COLOR%', color);
            this.el.innerHTML = html;
        }
    }
});



        editor.BlockManager.add('taskedit', {
          label: 'TASKEDIT',
          category: 'PAVE',
          content: EDIT,
        }, {at:0});
      }
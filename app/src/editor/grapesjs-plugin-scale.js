const SCALE = `<scale minimum="-10" maximum="10" namedValues="-10 max.UNsatisfactory 0 neutral 10 max.satisfactory" title="task title" description="task description">SCALE</scale>`;

 export const scalegjs = (editor, options) => {
        console.log('scale gjs init', options);
        //define custom component
        editor.DomComponents.addType('scale', {
            // Make the editor understand when to bind `my-input-type`
          isComponent: el => el.tagName === 'SCALE',
          model: {
            defaults: {
              // The tag name that will be used in the final code
              tagName: 'scale',
              droppable:false,
              attributes: { 
                title: 'task title',
                description:'task description',
                minimum: '-10', 
                maximum: '10',
                namedValues: '-10 max.UNsatisfactory 0 neutral 10 max.satisfactory' 
              },
              // You would use traits to customize custom properties
              traits: [
                'title',
                'description',                
                'minimum',
                'maximum',
                'namedValues'
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
              this.el.innerHTML = `<div class="scale">
                My custom HTML for scale component<br>
                title:  ${attrs['title']} description:  ${attrs['description']}
                minimum: ${attrs['minimum']} maximum: ${attrs['maximum']} namedValues: ${attrs['namedValues']}
              </div>`;
            }
          }
        });   
        // Use the API: https://grapesjs.com/docs/api/        
        editor.BlockManager.add('scale', {
          label: 'SCALE',
          category: 'PAVE',
          content: SCALE,
        }, {at:0});
      }

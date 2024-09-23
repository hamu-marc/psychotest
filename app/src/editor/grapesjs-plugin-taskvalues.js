const VALUES = `<taskvalues title='kategorické hodnocení' values='norma,minimální,mírná,střední,velmi těžká' onrow='true' color='w3-pale-red'></taskvalues>`;
const VALUESPREVIEW = `
<fieldset class="%COLOR%">
 <legend>%TITLE%</legend>  
%VALUES%
</fieldset>
`;
const VALUESITEMONROW=`<span>
<input type="radio" name="otazka" value="" id='valueinput'><label class="answer au-target" au-target-id="45" for="valueinput"><span><span></span></span>%VALUE%</label>
&nbsp;&nbsp;
</span>
`;
const VALUESITEM=`<span>
<input type="radio" name="otazka" value="" id='valueinput'><label class="answer au-target" au-target-id="45" for="valueinput"><span><span></span></span>%VALUE%</label>
<br/>
</span>
`;


export const taskvaluesgjs = (editor, options) => {
editor.DomComponents.addType('taskvalues', {
    isComponent: el => {
        return el.tagName === 'TASKVALUES';
    },

    model: {
        defaults: {
            tagName: 'taskvalues',
            droppable: false,  // Prevents dropping other components inside
            traits: [                
                // List of UI inputs to edit attributes of the tag
                { name: 'title', label: 'Title', type: 'text'},
                { name: 'values', label: 'Labels', type: 'text' },
                { name: 'onrow', label: 'on row', type: 'select', options:['true','false']},
                { name: 'color', label: 'Color', type: 'select', options:['w3-white','w3-pale-red','w3-pale-green','w3-pale-yellow','w3-pale-blue','w3-sand','w3-light-gray'] }
            ],

            // Define the properties that should be reflected in the HTML
            attributes: {
                'title': 'kategorické hodnocení',
                'values': 'norma,minimální,mírná,střední,velmi těžká',
                'onrow':'true',
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
            this.listenTo(this, 'change:attributes:onrow', this.handleAttributeChange);            
            this.listenTo(this, 'change:attributes:values', this.handleAttributeChange);            
        },

    // Handle attribute changes
    handleAttributeChange() {
        //console.log('grapesjs taskscale handleAttributeChange()');
        const title = this.getAttributes().title;
        const color = this.getAttributes().color;
        const onrow = this.getAttributes().onrow;
        const values = this.getAttributes().values;
        
        const view = this.view;
        if (view) {
            view.updatePreview({ title, color,onrow,values });
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
            let html = VALUESPREVIEW.replace('%TITLE%', title).replace('%COLOR%', color);
            let itemtemplate = ''
            if (attrs.onrow) itemtemplate = VALUESITEMONROW;//html = html.replaceAll('<br/>','&nbsp;&nbsp;'); //onrow seems to be boolean type
            else itemtemplate = VALUESITEM;//html.replaceAll('&nbsp;&nbsp;','<br/>');
            let htmlvalues = '';
            const myvalues = attrs.values.split(',');
            for (let v of myvalues) {
                htmlvalues += itemtemplate.replace('%VALUE%',v)
            }
            html = html.replace('%VALUES%',htmlvalues);
            this.el.innerHTML = html;
        }
    }
});


        editor.BlockManager.add('taskvalues', {
          label: 'TASKVALUES',
          category: 'PAVE',
          content: VALUES,
        }, {at:0});
    
      }
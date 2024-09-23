const SCALE = `<taskscale title='hodnotící škála' min='0' max='3' step='0.5' labels='0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká' color='w3-pale-green'></taskscale>`;
const SCALEPREVIEW = `
<fieldset class="%COLOR%">
  <legend>%TITLE%</legend>  
  <img style="width:100%" alt='taskscale preview' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATMAAABECAYAAADtCNKTAAAAxXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPz3FB0BPwAzDmlSqRt0/BrsSKHNSRyHbQ5jOD7vFzwGCAUkVy2tlGSQJo26CU2OPhmTTJ5gDoVrHETiElmIR6UftfiOZzwunDt2U/lipM9IbGuixQOkP0YUnY2Oht7DqIURkycwDLp/K5Wm9fqF7Ugr1BcMEl3b/jtXm96e7R0mOhg5GTMXb4DHEuBuohoT51FoBZ3zjGTGMLOB3M3pBHwB6zJZInLfiZwAAAGDaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1OlIhUHK6g4ZKhOdrGijrUKRagQaoVWHUyun9CkIUlxcRRcCw5+LFYdXJx1dXAVBMEPEGcHJ0UXKfF/SaFFjAfH/Xh373H3DhAaFaaaXTFA1SwjlYiLmeyqGHhFAMMYxAyiMjP1OUlKwnN83cPH17sIz/I+9+foy+VNBvhE4hjTDYt4g3h609I57xOHWEnOEZ8TTxh0QeJHrisuv3EuOizwzJCRTs0Th4jFYgcrHcxKhko8RRzOqRrlCxmXc5y3OKuVGmvdk78wmNdWlrlOcxQJLGIJEkQoqKGMCixEaNVIMZGi/biHf8TxS+RSyFUGI8cCqlAhO37wP/jdrVmITrpJwTjQ/WLbH2NAYBdo1m37+9i2myeA/xm40tr+agOY/SS93tbCR0D/NnBx3daUPeByBxh60mVDdiQ/TaFQAN7P6JuywMAt0Lvm9tbax+kDkKaukjfAwSEwXqTsdY9393T29u+ZVn8/Ku1y8MM0emkAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjFiOTkzNWMxLWQ5NzMtNGIyNS1iNjg0LTBiZDE4ZmRlOGNhMyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNTBiOWQ5NS1iZjMyLTRmMzYtYmY3Yy0xZTkwMGUyZDA0NmUiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozODU4NjY1NC0wYWM4LTQ5NWYtODdkMC0xODMzZDcxMmNiNmYiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE3MjE5NDQ2OTM3MDE5MjAiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNiIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQ6MDc6MjVUMjM6NTc6NTErMDI6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI0OjA3OjI1VDIzOjU3OjUxKzAyOjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDg2NTk4ODQtOGNiZi00N2M2LWIyNTQtZThiYjNhNWVmY2NhIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wNy0yNVQyMzo1ODoxMyswMjowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6zEyc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AcZFToN6Ac0FQAAAAZiS0dEAP8A/wD/oL2nkwAADklJREFUeNrtnW1QVFeagB+RRmg+bAUaof1ERBIYtP02qCEoYpioKWIRGCOTSWfXNgYiY8UetIMNdo/VQ5yemVClcbWM1riZWjWbMYkViwrZtXbdzU4ym52Nqa01GWuSiTrjZoy4Vfn57g9ut5febgFFheT98RRN972HPufe+/C+55x7LiKCoijKSEcbQVEUlZmi9Meff4pr7TQ+HpfI16TlfU3p5rMckQptG0Vlpowc/oOKzQUIiTahaO5vH5rB75NBWLrnKiLTtI0UlZkyIrjk5YQNhOpDVxGxyZcs3lqCkOgUfik7tI0UlZkyIuh+gt9DsuD+t7O975H8d+v4GpKFbZdOaBspKjNlRPB6LVchWWi+8E74vVP1XIJkofHcWW0jRWWmqMwURWWm3C261vMxJAsuTTMVlZkygrnu5agNhEpjAOA8i7cWISQvFo7rAICi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'/>
  </fieldset>
`;
export const taskscalegjs = (editor, options) => {
editor.DomComponents.addType('taskscale', {
    isComponent: el => {
        return el.tagName === 'TASKSCALE';
    },

    model: {
        defaults: {
            tagName: 'taskscale',
            droppable: false,  // Prevents dropping other components inside
            traits: [
                {
                    name: 'preset',
                    label: 'Preset',
                    type: 'select',
                    options: [
                        { value: 'h', name: 'H - hodnotící škála' },
                        { value: 'g', name: 'G - celková porucha' },                        
                        { value: 'r', name: 'R - chraplavost/drsnost' },
                        { value: 'b', name: 'B - dyšnost' },
                        { value: 'a', name: 'A - hlasová slabost' },
                        { value: 's', name: 'S - hlasové napětí' },
                        { value: 'i', name: 'I - nestabilita' }
                    ],
                  //  changeProp: 1  // Makes this trait trigger the 'change:preset' event
                },
                // List of UI inputs to edit attributes of the tag
                { name: 'title', label: 'Title', type: 'text'},
                { name: 'min', label: 'Min', type: 'number' },
                { name: 'max', label: 'Max', type: 'number' },
                { name: 'step', label: 'Step', type: 'number' },
                { name: 'labels', label: 'Labels', type: 'text' },
                { name: 'color', label: 'Color', type: 'select', options:['w3-white','w3-pale-red','w3-pale-green','w3-pale-yellow','w3-pale-blue','w3-sand','w3-light-gray'] }
            ],

            // Define the properties that should be reflected in the HTML
            attributes: {
                'title': 'hodnotící škála',
                'min': '0',
                'max': '3',
                'step': '0.5',
                'labels': '0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká',
                'color': 'w3-pale-green'
            },
             // Add default style to the component
          style: {
            //display: 'inline-block', // Default style
          }
        },
        // Listen for changes to the 'preset' trait
        init() {
            this.listenTo(this, 'change:attributes:preset', this.handlePresetChange);
            this.listenTo(this, 'change:attributes:title', this.handleAttributeChange);
            this.listenTo(this, 'change:attributes:color', this.handleAttributeChange);            
        },
        handlePresetChange() {
            //console.log ('grapesjs taskscale handlepresetchange() this:',this)            
            console.log ('grapesjs taskscale handlepresetchange() preset:',preset)
            const newAttributes = this.getAttributes();
            const preset = this.getAttributes().preset;
            if (preset === 'g') {
                newAttributes.title = 'G - celková porucha';
                newAttributes.min = '0'
                newAttributes.max = '3'
                newAttributes.step = '0.5'
                newAttributes.labels = '0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká'
                newAttributes.color = 'w3-pale-green';
            } else if (preset === 'r') {
                newAttributes.title = 'R - chraplavost/drsnost'
                newAttributes.min = '0'
                newAttributes.max = '3'
                newAttributes.step = '0.5'
                newAttributes.labels = '0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká'

                newAttributes.color = 'w3-pale-red'                    
            } else if (preset === 'b') {                    
                newAttributes.title = 'B - dyšnost'
                newAttributes.min = '0'
                newAttributes.max = '3'
                newAttributes.step = '0.5'
                newAttributes.labels = '0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká'

                newAttributes.color = 'w3-pale-yellow'
            } else if (preset === 'a') {
                newAttributes.title = 'A - hlasová slabost'
                newAttributes.min = '0'
                newAttributes.max = '3'
                newAttributes.step = '0.5'
                newAttributes.labels = '0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká'

                newAttributes.color = 'w3-pale-blue'
            } else if (preset === 's') {
                newAttributes.title = 'S - hlasové napětí'
                newAttributes.min = '0'
                newAttributes.max = '3'
                newAttributes.step = '0.5'
                newAttributes.labels = '0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká'
                newAttributes.color = 'w3-sand'
            } else if (preset === 'i') {
                newAttributes.title = 'I - nestabilita'
                newAttributes.min = '0'
                newAttributes.max = '3'
                newAttributes.step = '0.5'
                newAttributes.labels = '0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká'
                newAttributes.color = 'w3-light-gray'
            }
            console.log('setting attributes to this:',this);
            //this.view.
            //this.setAttributes(newAttributes);

            // Update traits in the UI
            /*Object.keys(newAttributes).forEach(attr => {
                this.view.attr[attr] = newAttributes[attr];
            });*/
            this.setAttributes(newAttributes);
            //this.handleAttributeChange();
            // Trigger a change to re-render the component and update traits
            //this.trigger('change:attributes');
        },

    // Handle attribute changes
    handleAttributeChange() {
        //console.log('grapesjs taskscale handleAttributeChange()');
        const title = this.getAttributes().title;
        const color = this.getAttributes().color;
        const view = this.view;
        if (view) {
            view.updatePreview({ title, color });
        }                
    }
    },

    view: {
        // Optionally, define how the component should be updated on attribute change
        onRender: function () {  
            const attrs = this.model.getAttributes();
            this.updatePreview(attrs);
            //this.el.innerHTML = SCALEPREVIEW;          
            const {model} = this;            
            //const attrs = model.getAttributes();
            const labelMap = attrs.labels.split(';').reduce((acc, pair) => {
                const [key, value] = pair.split(',');
                acc[key.trim()] = value.trim();
                return acc;
            }, {});

            // Example usage of labelMap inside your component
            console.log('Label Map:', labelMap);
        },
        updatePreview(attrs) {
            const title = attrs.title || 'title';
            const color = attrs.color || 'w3-pale-green';
            const html = SCALEPREVIEW.replace('%TITLE%', title).replace('%COLOR%', color);
            this.el.innerHTML = html;
        }
    }
});

        editor.BlockManager.add('taskscale', {
          label: 'TASKSCALE',
          category: 'PAVE',
          content: SCALE,
        }, {at:0});
      }
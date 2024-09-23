const RANKING2D = `<ranking2d title="task ranking" random="true" audios="" xlabel="x axis" ylabel="y axis">RANKING2D</ranking2d>`;
const SVGRANKINGDEMO = 
`<svg width="100%" height="100%" version="1.1" viewBox="-10 0 800 170" style="border-style:solid;border-width:1px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >

<g id="ball0" dragy="0" dragx="0" transform="translate(0,0)">
<rect style="opacity:0.50000000000000000;fill:#acd8e6;stroke:#000000;stroke-width:2;fill-opacity:1;stroke-opacity:1" height="18" width="40" ry="9" rx="9" id="ball" x="0" y="0"></rect>
<path style="fill:#c0c0c0;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 21,3 l 15,5 -15,5 0,-10 z" id="path3792" onclick="document.getElementsByTagName('audio')[0].play();"></path>
<title>stimul[1]</title><text x="4" y="11" font-size="10" fill="black" style="pointer-events: none;">1</text> 
</g>  
<g id="ball1" dragy="50" dragx="0" transform="translate(0,50)">
<rect style="opacity:0.50000000000000000;fill:#acd8e6;stroke:#000000;stroke-width:2;fill-opacity:1;stroke-opacity:1" height="18" width="40" ry="9" rx="9" id="ball" x="0" y="0"></rect>
<path style="fill:#c0c0c0;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 21,3 l 15,5 -15,5 0,-10 z" id="path3792" onclick="document.getElementsByTagName('audio')[1].play();"></path>
<title>stimul[2]</title><text x="4" y="11" font-size="10" fill="black" style="pointer-events: none;">2</text> 
</g>  
<g id="ball2" dragy="100" dragx="0" transform="translate(0,100)">
<rect style="opacity:0.50000000000000000;fill:#acd8e6;stroke:#000000;stroke-width:2;fill-opacity:1;stroke-opacity:1" height="18" width="40" ry="9" rx="9" id="ball" x="0" y="0"></rect>
<path style="fill:#c0c0c0;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 21,3 l 15,5 -15,5 0,-10 z" id="path3792" onclick="document.getElementsByTagName('audio')[2].play();"></path>
<title>stimul[3]</title><text x="4" y="11" font-size="10" fill="black" style="pointer-events: none;">3</text> 
</g>  
<text id="descx" x="0" y="168" font-size="16" fill="black" style="pointer-events: none;">→  preview x axis →</text>
<text id="descy" x="0" y="161" font-size="16" fill="black" style="pointer-events: none;" transform="rotate(270,0,161)">→ preview y axis →</text>
</svg>`

 export const rankinggjs = (editor, options) => {
        console.log('ranking2d gjs init', options);
        //define custom component
        editor.DomComponents.addType('ranking2d', {
            // Make the editor understand when to bind `my-input-type`
          isComponent: el => el.tagName === 'RANKING2D',
          model: {
            init() {
              this.on('add', (model) => {
                if (!model.get('id')) {
                  model.set('id', model.cid); // or use any unique ID generation logic
                }
              });
            },
            defaults: {
              // The tag name that will be used in the final code
              tagName: 'ranking2d',
              droppable:false,
              attributes: { 
                title: 'ranking',
                random: 'true',
                xlabel:'x axis',
                ylabel: 'y axis'
              },
              // You would use traits to customize custom properties
              traits: [          
                'title',
                { name: 'random', type:'checkbox'},
                'xlabel',
                'ylabel'
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
              this.el.innerHTML = '<p class="w3-center">'+attrs.title+`</p><div class="ranking2dview">`+SVGRANKINGDEMO.replace('xaxis',"${attrs['xaxis']}").replace('yaxis',"${attrs['yaxis']}")+`</div>`;
              //title:  ${attrs['xaxis']} title:  ${attrs['yaxis']}
            }
          }
        });   

        // Use the API: https://grapesjs.com/docs/api/        
        editor.BlockManager.add('ranking2d', {
          label: 'RANKING2D',
          category: 'PAVE',
          content: RANKING2D,
        }, {at:0});
      }

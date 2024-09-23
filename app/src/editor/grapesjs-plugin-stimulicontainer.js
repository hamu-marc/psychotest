const STIMULIJS = `<div style="clear:both"></div>`; 

 export const stimulicgjs = (editor, options) => {

        editor.BlockManager.add('stimulicontainer', {
          label: 'STIMULICONTAINER',
          category: 'PAVE',
          content: STIMULIJS,
        }, {at:0});
      }

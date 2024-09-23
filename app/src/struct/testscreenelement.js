import {Interpreter} from '../components/interpreter';

export class Test {
    //name= '';
    //settings = [];
    //screens = [];
    //items (Screen,Setting,Element) by line number = []
    constructor(name) {
        this.name = name;
        this.settings = [];
        this.screens = [];
        this.items = [];
    }

    addSetting(setting) {
        this.settings.push(setting);
        this.items[setting.lineNumber] = setting;
    }

    addScreen(screen) {
        this.screens.push(screen);
        this.items[screen.lineNumber] = screen;
        //for eac element in screen add link to items
        for (let element of screen.elements) {
            this.items[element.lineNumber] = element;
        }
    }

    increaseLineNumberFrom(lineNumber) {
        for (let i = lineNumber; i< this.items.length; i++) {
            this.items[i].lineNumber++;
        }
    }
}

export class Setting {
    //definition = '';
    constructor(definition,lineNumber,owningTest) {
        this.definition = definition;
        this.lineNumber = lineNumber;
        this.owningTest = owningTest;
    }
}

export class Screen {
    //name = '';
    //elements = [];
    constructor(name,lineNumber,owningTest) {
        this.name = name;
        this.lineNumber = lineNumber;
        this.elements = [];
        this.owningTest = owningTest;
    }

    addElement(element) {
        this.elements.push(element);
        if (element.lineNumber == -1) { 
            //it will insert at the end of the screen and increases all following line numbers
            if (this.elements.length>1) {
                element.lineNumber = this.elements[this.elements.length-2].lineNumber+1;
                this.owningTest.increaseLineNumberFrom(element.lineNumber+1);
            }
        }
    }
     // Method to find the first row starting with 'design'
     findDesignRow() {
        // Using find() to return the first element that matches the condition
        const designRow = this.elements.find(element => element.definition.startsWith('design'));
        return designRow || null; // Return the found row or null if no match
    }

    getDesign() {
        let designRow = this.findDesignRow();
        if (designRow) return designRow.definition.slice(7); //remove 'design '
    }

    getPreview() {
    let itp = new Interpreter(this);
    let range = 'test preview \nscreen '+this.name+'\n' + this.elements.map(element => element.definition).join('\n');
    itp.initTest(range);
    let previewinnerHTML = itp.nextpage();//parser.currentTest);
    return previewinnerHTML;
    }

    setDesign(design) {
        let designRow = this.findDesignRow();
        const newDefinition = 'design '+design;
        if (designRow) designRow.definition = newDefinition;
        else this.addElement(new Element(newDefinition,this,-1,this.test));
    }
    lastNoPrevPage(){}
    firstPage(){}
}

export class Element {
    //definition = '';
    //owningScreen = null
    constructor(definition,owningScreen,lineNumber,owningTest) {
        this.definition = definition;
        this.owningScreen = owningScreen;
        this.lineNumber = lineNumber;
        this.owningTest = owningTest;
    }
}

export class PsychotestInterpreter {
    //test; //type of Test
    //testDocument; //string of test
    // Function to parse the test definition
    parseTestDefinition(testDefinitionContent) {
        const lines = Array.isArray(testDefinitionContent)?testDefinitionContent: testDefinitionContent.split('\n');
        const testName = lines[0].trim().substring(5); // Extracting test name from the first line
        const test = new Test(testName);

        let currentScreen = null;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('screen')) {
                // When a new screen starts
                if (currentScreen !== null) {
                    test.addScreen(currentScreen,i); // Add the previous screen to the test
                }
                const screenName = line.substring(7).trim(); // Extracting screen name                
                currentScreen = new Screen(screenName,i,test);
            } else if (currentScreen) {
                // Lines that are part of the current screen
                currentScreen.addElement(new Element(line,currentScreen,i,test));
            } else {
                // Lines that are part of the settings
                test.addSetting(new Setting(line,i,test));
            }
        }

        if (currentScreen !== null) {
            test.addScreen(currentScreen); // Add the last screen to the test
        }
        this.test = test;
        return test;
    }

    createTestDefinition() {
        let lines = [];

        // Add test name
        lines.push(`test ${this.test.name}`);

        // Add settings
        this.test.settings.forEach(setting => {
            lines.push(`  ${setting.definition}`);
        });

        // Add screens and their elements
        this.test.screens.forEach(screen => {
            // Add screen name with indentation of 2 spaces
            lines.push(`  screen ${screen.name}`);

            // Add each element with indentation of 4 spaces
            screen.elements.forEach(element => {
                lines.push(`    ${element.definition}`);
            });
        });
        this.testDocument = lines.join('\n');
        return this.testDocument;
    }

    findScreenByCursor(cursor) {
        if (this.test.items[cursor] instanceof Screen) return this.test.items[cursor];
        if (this.test.items[cursor] instanceof Element) return this.test.items[cursor].owningScreen;
        return null;
    }
}

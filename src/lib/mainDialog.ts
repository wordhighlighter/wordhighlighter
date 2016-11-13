///<reference path="dao.ts" />

class MainDialog {
    dao: DAO;
    document: Document;

    constructor(dao: DAO, document: Document) {
        this.dao = dao;
        this.document = document;
    }

    load(): void {
        let dialog = this;
        this.dao.getDictionary(function(dictionary: Array<DictionaryEntry>) {
            let listElement = document.querySelector('ul');
            while (listElement.firstChild) {
                listElement.removeChild(listElement.firstChild);
            }

            for (let i=0; i < dictionary.length; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = dictionary[i].value;
                listElement.appendChild(listItem);
            }
        });

        this.document.addEventListener('click', function(e: MouseEvent) {
            let target = <Element>e.target;
            if (target.id === 'add-new-word-button') {
              dialog.onAddNewWordClicked();
            }
        });
    }

    onAddNewWordClicked(): void {
        let newWordElement = <HTMLInputElement>document.getElementById('new-word');
        let newWord = newWordElement.value;
        if (!newWord) {
            return;
        }
        this.dao.addEntry(new DictionaryEntry(newWord), function() {
            this.load();
        });
    }
}
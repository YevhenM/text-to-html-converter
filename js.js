
// get buttons
Convert.onclick = convertText
Export.onclick = exportText
add.onclick = addText

function addText(){
    document.querySelector('.inputText').value = 
    "Этот текст {{input: какой-то текст}} редактируемый. Содержит пустые поля ввода {{input}}, а также поля ввода, которые содержат какую-то информацию {{input: какой-то текст}}. Также, текст содержит области {{textarea}} {{textarea:какой-то длинный текст, в котором могут встречаться двоеточия:}} с информацией"
}

function convertText(){
    let text = document.querySelector('.inputText').value    
    let output = document.querySelector('.output') 
    let newtext = replaceBracesWithTags(text)
    output.innerHTML = newtext
}

// This function replaces HTML tags <input> and <textaria> to text blocks {{input}} and {{textarea}}
function exportText(){
    let source = document.querySelector('#out1')    
    let output = document.querySelector('#out2')
    let result = ""

    for(i in source.childNodes){        
        let type = source.childNodes[i].nodeName
        if(type === '#text') {result += (source.childNodes[i].textContent)}
        if(type === 'INPUT') {result += (source.childNodes[i].value) ? "{{input:"+source.childNodes[i].value+"}}" : "{{input}}"}
        if(type === 'TEXTAREA') {result += (source.childNodes[i].innerHTML) ? "{{textarea:"+source.childNodes[i].innerHTML+"}}" : "{{textarea}}"}
    }
    console.log(result)
    output.innerText = result
}

// This function replaces textblocks like {{input}} and {{textarea}} to HTML tags
function replaceBracesWithTags(text) {
     const find = ["{{input", "{{textarea"]
     let result = text
     for(a in find) {
         result = replaceWithTag(result, find[a])        
     }   

    return result

    function replaceWithTag(text, find){
        
        let ret = text
        let tag = find.slice(2)
        let index = -1
        let param = ""

        if ((index = text.indexOf(find, index+1)) != -1){
            let cls = text.indexOf("}}", index)            
            if(text.slice(index+find.length,index+find.length+1) === ":") {param = text.slice(index+find.length+1, cls)}   
            
            let replacedText = (text.slice(index, cls+2))
            let textForReplace = (tag === 'input') ? `<${tag} value='${param}'/>` : `<${tag}>${param}</${tag}>`
            
            ret = text.replace(replacedText, textForReplace)            
            return replaceWithTag(ret, find)
                         
        }  else {            
            return ret
        }
    }
}



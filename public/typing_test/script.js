document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start');
    const diff= document.getElementById('difficulty');

    startButton.addEventListener('click', async()=>{
        try{
            const response=await fetch("sampletext.json");
            const data=await response.json();
            const difficulty=diff.value;

            let selectedText="";
            if(difficulty==="easy"){
                selectedText=getRandomText(data.easy);
            }else if(difficulty==="medium"){
                selectedText=getRandomText(data.medium);
            }else{
                selectedText=getRandomText(data.hard);
            }
            displayText(selectedText);

        }
        catch(error){
            console.error(error);
        }
    });
    function getRandomText(arr){
        return arr[Math.floor(Math.random()*arr.length)];
    }

    function displayText(text){
        const textContainer=document.getElementById('text');
        if(textContainer){
            textContainer.textContent=text;
        }
        else{
            const newtextContainer=document.createElement('h4');
            newtextContainer.id='text';
            newtextContainer.textContent=text;
            document.querySelector('.data').appendChild(newtextContainer);
        }
    }
});
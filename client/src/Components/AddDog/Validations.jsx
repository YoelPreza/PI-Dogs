const validate = (input)=>{
    let errors = {}; 

    // let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //expresion regular valida que solo se acepten mayúsculas y minúsculas            
    let regexName = /[A-Z]/
    let regexNumbers = /^[0-9]\d*(\.\d+)?$/; //  /[0-9]/ es otra expresión regular para numeros
    
//----------------------------------------Name-----------------------------//
if(input.name===""){errors.name = "Breed is necesary"
        }else if(!regexName.test(input.name)){ errors.name = "Only Upper Case "}
// Cuando el input este vacio no marque el error en el nombre

//----------------------------------------Weight-----------------------------//
if(input.weightMin===""){errors.weightMin = "Weight Min is necesary"
        }else if(!regexNumbers.test(input.weightMin)){
         errors.weightMin = "Only numbers. Example: 2"
        }else if(input.weightMin < 1){
            errors.weightMin = "The minimum weight mustn't be less than 1kg"
        }else if(input.weightMin > 60){
            errors.weightMin = "The minimum weight mustn't be more than 60kg"}

if(input.weightMax===""){errors.weightMax = "Weight Max is necesary"
        }else if(!regexNumbers.test(input.weightMax)){
         errors.weightMax = "Only numbers. Example: 2"
        }else if(parseInt(input.weightMax) < parseInt(input.weightMin) ){
            errors.weightMax = " Mustn't be less than Weight Min"
        }else if(input.weightMax > 140){
            errors.weightMax = "Mustn't be more than 140kg"}   
//----------------------------------------Height-----------------------------//
if(input.heightMin===""){errors.heightMin = "Height Min is necesary"
        }else if(!regexNumbers.test(input.heightMin)){
        errors.heightMin = "Only numbers. Example: 2"
        }else if(input.heightMin < 10){
            errors.heightMin = "The minimum height mustn't be less than 10cm"
        }else if(input.heightMin > 120){
            errors.heightMin = "The minimum height mustn't be more than 120cm"}

if(input.heightMax===""){errors.heightMax = "height Max is necesary"
        }else if(!regexNumbers.test(input.heightMax)){
         errors.heightMax = "Only numbers. Example: 2"
        }else if(parseInt(input.heightMax) < parseInt(input.heightMin) ){
            errors.heightMax = " Mustn't be less than height Min"
        }else if(input.heightMax > 160){
            errors.heightMax = "Mustn't be more than 160cm"}   
//----------------------------------------Life Span-----------------------------//
if(input.life_span_min===""){errors.life_span_min = "life span min Min is necesary"
        }else if(!regexNumbers.test(input.life_span_min)){
        errors.life_span_min = "Only numbers. Example: 2"
        }else if(input.life_span_min < 5){
            errors.life_span_min = "The minimum life span mustn't be less than 5 years"
        }else if(input.life_span_min > 10){
            errors.life_span_min = "The minimum life span mustn't be more than 10 years"}

if(input.life_span_max===""){errors.life_span_max = "life span max Max is necesary"
        }else if(!regexNumbers.test(input.life_span_max)){
         errors.life_span_max = "Only numbers. Example: 2"
        }else if(parseInt(input.life_span_max) < parseInt(input.life_span_min) ){
            errors.life_span_max = " Mustn't be less than life span min"
        }else if(input.life_span_max > 16){
            errors.life_span_max = "Mustn't be more than 16 years"}   

//----------------------------------------image-----------------------------//
if(input.image==="") errors.image = "Image is necesary"

//----------------------------------------temperament-----------------------------//
if(input.temperament.length === 0) errors.temperament = "A minimum temperament is required"

    return errors
}
export default validate;
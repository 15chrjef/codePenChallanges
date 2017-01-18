var _ = require('underscore');

var companies = ["Microsoft", "Microsoft Corporation", "University of Washington", "Google Inc.", "Flurish", "Bill & Melinda Gates Foundation", "University of Texas at Austin", "Dell"];

var text = "William Henry \"Bill\" Gates III is an American business magnate, entrepreneur, investor, author, and philanthropist.  In 1975, Gates and Paul Allen co-founded Microsoft Corporation, which became the world's largest PC software company. During his career at Microsoft, Gates held the positions of chairman, CEO and chief software architect, and was the largest individual shareholder of Microsoft until May 2014. " +
"Since 1987, Gates has been included in the Forbes list of the world's wealthiest people[7] and was the wealthiest from 1995 to 2007, again in 2009, and has been since 2014. " +
"The William H. Gates family has an unparalleled record of service to the University of Washington, the community, the region and the world. " +
"The Bill and Melinda Gates Computer Science Complex and Dell Computer Science Hall officially open this week at The University of Texas at Austin. " +
"Later in his career, Gates pursued a number of philanthropic endeavors, donating large amounts of money to various charitable organizations and scientific research programs through the Bill & Melinda Gates Foundation, established in 2000. " +
"Microsoft's Bing is a direct competitor of the search engine built by Google Inc.";

const compareWords = (word1, word2) => {
  for(var i = 0; i < word1.length; i++){
    if(word1[i] !== word2[i]){
      return false
    }
  }
  return true
}

const textSearcher = () => {
  var companyLocations = [];
  for(var i = 0; i < text.length; i++){
    for(var j = 0; j < companies.length; j++){
      if(text[i] === companies[j][0]){
        if(compareWords(companies[j], text.substr(i, i + companies[j].length -1))){
          companyLocations.push([companies[j], i])
        }
      }
    }
  }
  return companyLocations
}

console.log(textSearcher())
//find all the occurences of companies

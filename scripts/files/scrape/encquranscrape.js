// This script will fetch translations from quranenc.com

var fs = require('fs');


var { firefox } = require('playwright');

var url = 'https://quranenc.com/en/browse/'

/*
var arr = ['tagalog_rwwad','pashto_zakaria','bosnian_korkut',
'ukrainian_yakubovych',
'vietnamese_hassan',
'kazakh_altai',
'kazakh_altai_assoc',
'uzbek_sadiq',
'azeri_musayev',
'tajik_khawaja',
'malayalam_kunhi',
'gujarati_omari',
'marathi_ansari',
'telugu_muhammad',
'sinhalese_mahir',
'nepali_central',
'thai_complex',
'somali_abduh',
'swahili_abubakr',
'luganda_foundation',
'ankobambara_foudi'];
*/
var chaplength = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6]

var arr = ['arabic_seraj'];


(async () => {
  const browser = await firefox.launch({acceptDownloads:true});
  const context = await browser.newContext();
  const page = await context.newPage();
  // Trimming first few
//  arr = arr.splice(1,1)

for (name of arr){
  var fulltext = []

  for (i=1;i<=114;i++){


  await page.goto(url+name+'/'+i).catch(async error =>
{
console.error(error)
await page.goto(url+name+'/'+i)

})
textarr = await page.evaluate(() => {
  names = Array.from(document.querySelectorAll(".aya_text"))
     names = names.map(val => val.textContent.replace(/[0-9]{1,3}(\s|\.|-){0,3}[0-9]{0,3}/,"").replace(/(\[|\()[0-9]{0,3}(\]|\))/g,"").replace(/\n/g," ").trim())

     return names
});

if(chaplength[i-1] != textarr.length)
   console.log("Problem in chapter", i)

fulltext = fulltext.concat(textarr)


}

fs.writeFile("./"+name,fulltext.join('\n'),error=>console.error())
}
//  await page.screenshot({ path: `example.png` });
//  await page.click('data-test-id=foo')

// sectionText = await page.$eval('td', e => e.textContent);






  await browser.close();
})().catch(console.error);

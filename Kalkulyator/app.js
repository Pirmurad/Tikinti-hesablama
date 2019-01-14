const app = new Vue({
el:'#app',
name:'Bina hesablanmasi vuejs ile',
data:{
    en:70,
    uzunlug:12,
    hundurluk:4,
    damOrtuyununMaililiyi:20,
    dosemeninQalinligi:1,
},
computed:{
    divarinSahesi(){
        return (( this.en * 2 + this.uzunlug * 2 ) * this.hundurluk).toFixed(1)
    },
    daminSahesi(){
        // Faizin tapilmasi
      let maillikFaiz=this.damOrtuyununMaililiyi / 100
      return (Math.sqrt(Math.pow(this.en/2,2) + Math.pow(this.en * maillikFaiz,2) )* 2 * this.uzunlug).toFixed(1)
    },
    metalKonstruksiyaCekisi(){
        let maillik = this.damOrtuyununMaililiyi / 100

         if(maillik < 0.2){
           maillik =  1.08;
           }
           else
          {
            maillik =  1;

         }

         // burda bax gor maillik ne qaytarir
         console.log('maiilik= '+maillik)

         // Burda hesab sehvi var bu blokda

          let betonSerf= this.betonSerfiyyati
          console.log('betonSerf ='+betonSerf)
        if( this.daminSahesi < 400)
        {
           return (((this.daminSahesi * 0.032) + (this.en*2 + this.uzunlug*2)/6*(this.hundurluk - 4)*0.05) * maillik).toFixed(2)
           // bu deyiskenlerin yerini duz yazmisan ? D3 D4 falan onlari dyan baxim
           /*
           D3 - en
           D4 - uzunlug
           D8 - qalinlig amma faizle burda ola biler nedise
           
           */
        }
        else
         {  //D7 nin qiymeti
             
             return (((this.daminSahesi * 0.027) + (this.en*2 + this.uzunlug*2)/6*(this.hundurluk - 4)*0.05) * maillik).toFixed(2)
            
        }
    },
    betonSerfiyyati(){
        // D3*D4*D8/100*2.2

        return (this.en * this.uzunlug * this.dosemeninQalinligi / 100 *2.2).toFixed(2)

        
    },
    armaturSerfiyyati(){
            // D8 in qiymeti
            if(this.dosemeninQalinligi > 13){
                var qalinliqQiyemti = 1 + (this.dosemeninQalinligi - 12) / 5
              
            }
            else{
                 var qalinliqQiyemti= 1
            }

            return (this.en * this.uzunlug * 12 / 1000 * qalinliqQiyemti).toFixed(2)

    },
    sendvicPanelSerfiyyati(){
        // G4+G3
        return (parseFloat(this.divarinSahesi) + parseFloat(this.daminSahesi)).toFixed(1)
    }
},

    
methods: {
    tikintiXerci(){
     let metalK=this.metalKonstruksiyaCekisi*10665;
     let betonS=this.betonSerfiyyati*1127;
     let ArmaturS=this.armaturSerfiyyati * 24802;
     let SendivicPS=this.sendvicPanelSerfiyyati*199;

     return (edediOrtasi= (metalK + betonS + ArmaturS + SendivicPS ) / 4).toFixed(2);
    }
},

})

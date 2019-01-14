const app = new Vue({
el:'#app',
name:'Bina hesablanmasi vuejs ile',
data:{
    en:null,
    uzunlug:null,
    hundurluk:null,
    damOrtuyununMaililiyi:null,
    dosemeninQalinligi:null
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
        if(this.betonSerfiyyati  < 400)
        {
           return (this.betonSerfiyyati * 0.032).toFixed(2);
        }
        else
         {  //D7 nin qiymeti
             if(this.damOrtuyununMaililiyi < 0.2){
                let maillik =  1.08
              }
              else
              {
                let maillik =  1;

             }
             return (this.betonSerfiyyati * 0.027) + (this.en*2 + this.uzunlug*2)/6*(this.hundurluk - 4)*0.05 * maillik
            
        }
    },
    betonSerfiyyati(){
        // D3*D4*D8/100*2.2
        return (this.en * this.uzunlug * (this.dosemeninQalinligi / 100) *2.2).toFixed(2)
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
addLayer("A", {
    tabFormat: {
        "Achievements": {
            content: [
  
              ["infobox", "lore"],
              "blank",
              ["achievements", [1]]
             
             
               
            ],
        },
        "Secret Achievements":{
            content:[
                ["achievements", [7]]
            ]
        }

    },
    row: "side",
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    points: new Decimal(0),
    
    layerShown: true,
    type: "none",
    tooltip() {
      return "Achievements & Tips"
    },
  nodeStyle(){
    if ((getClickableState("c",11))==1) {
      return{
        "background-color":"brown"
      }
        
      
    }
     else 
      return {
        "background-color":"yellow"
    }
  },
    achievements: {
      11: {
          name: "Young Population Is Important Huh",
          tooltip: "Buy Homes Upgrade <br> <h5>Reward: Gives you more hospitals!<h5>",
          done() {
           if(hasUpgrade("c",13)){
            return true
           }
          },
          style() {
            return {
              "width": "110px",
              "height": " 110px",
              "border-radius": "20px",
              "border": "100px",
              "margin": "0.5px"
            }
          },
      },
      
    12: {
        name: "Slowly getting there",
        tooltip: "Get your first kingdom upgrade! <br> <h5><h5>",
        done() {
        if(getBuyableAmount("c",11).gte(1))
            return true
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
    13: {
        name: "Spending time to increase life quality",
        tooltip: "Play for 30 mins <br> <h5><h5>",
        done() {
        if(player.timePlayed >1800)
            return true
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
   
    71: {
        name(){
            if (hasAchievement(this.layer,this.id)) {
                
                    
                
                    return "You are an alien"
                
            } 
            else {
             
               
             
                
              return "???????"
            }
        },
        tooltip(){
            if (hasAchievement(this.layer,this.id)) {
                return "Have 1 Kingdom With Light Theme"
                
            } else {
                return "????????????"
            }
        },
        done() {
        if(player.k.unlocked)
        if(getClickableState("c",11)==0)
        if(!getBuyableAmount("c",21).gte(1))    
            return true
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
  }
  
  
})
addLayer("c", {
    tabFormat: {
        "Item Shop": {
            content: [
  
              ["infobox", "lore"],
              ["clickables", [1]],
              "main-display",
              ["display-text",
                function() {
                    if (player.c.points.gte(100)) {
                        return "You are currently losing  "+format(lifeSpan())
                        
                    } else {
                        ""
                    }
                      
                },
                { "color": "rgb(223, 223, 223)", "font-size": "14px"} 
  
              ],
              "blank",
              "prestige-button",
              "blank",
              "resource-display",
              "upgrades",
               "blank",
               
               
            ],
        },
        "Kingdom Upgrades":{
            bodyStyle(){
                if ((getClickableState("c",11))==1) {
                  return{
                    "background-color":"brown"
                  }  
                } else {
                    return{
                "color":"white"
                    }
                     
                }
            },
            unlocked(){
                if (hasUpgrade("c",23)) {
                  return true  
                } else {
                    return false
                }
            },
            content: [
            ["clickables", [2]],    
            "blank",
            "buyables",
            "blank",
            
            ]
        },
        "Milestones":{
            content: [
                "milestones"
            ]
        },
       
            
  },
    name: "Citizens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        
    }},
   color(){
    if ((getClickableState("c",11))==1)return "#7c0404"
       
        
        
 else return  "#f78afe"
        
    
   } ,
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Citizens", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade(this.layer, 11)) mult=mult.div(upgradeEffect(this.layer,11).div(10).add(1))
            if(hasUpgrade(this.layer,13)) mult=mult.div(upgradeEffect(this.layer,13))
                if(hasUpgrade(this.layer, 21)) mult=mult.div(upgradeEffect(this.layer,21).div(10))   
                    if(hasUpgrade(this.layer,23)) mult=mult.div(upgradeEffect(this.layer,23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    infoboxes: {
        lore: {
            title: "Explanation",
            titleStyle(){
                
            },
            body() { return "This is your mighty journey to creating your own empire that you promised former emperor your father.<br>Once you were little you saw your citizens's pains so you promised yourself to create a good empire for them but your journey will not be easy so let's see which path you will chose;a path of tyran or a warm hearted emperor." },
            
            
        },
        
    },
    
    autoPrestige() {
        if (isCKeyHeld == true) return true
        else return false
      },
    milestones: {
        1: {
            requirementDescription: "Open Kingdom Upgrades Menu",
            effectDescription: "Boost your point production 5 times",
            done() {
                if(hasUpgrade("c",23))
                    return true
             },
             style(){
                if ((getClickableState("c",11))==1) {
                    if (hasMilestone(this.layer,this.id)) {
                        return{
                            "background-color":"none",
                            "color":"none"
 } 
                    }
                return{
                    "background-color":"#43007d",
                    "color":"#ff9787"
                }
                } else {
                    if (hasMilestone(this.layer,this.id)) {
                        return{
                            "background-color":"none",
                            "color":"none"
                        } 
                    }
                    return{
                        "background-color":"#ff9787" ,
                        "color":"#43007d"
                    }
                  

                }
             },
           
        },
        2: {
            requirementDescription: "Earn 200 Citizens",
            effectDescription: "Decreas İnformation Gathering upgrade's cost",
            done() {
                if(player.c.points.gte(200))
                    return true
             },
             style(){
                if ((getClickableState("c",11))==1) {
                    if (hasMilestone(this.layer,this.id)) {
                        return{
                            "background-color":"none",
                            "color":"none"
                        } 
                    }
                return{
                    "background-color":"#43007d",
                    "color":"#ff9787"
                }
                } else {
                    if (hasMilestone(this.layer,this.id)) {
                        return{
                            "background-color":"none",
                            "color":"none"
                        } 
                    }
                    return{
                        "background-color":"#ff9787" ,
                        "color":"#43007d"
                    }
                  

                }
             },
           
        },
        3: {
            requirementDescription: "Have First 3 Achivements",
            effectDescription: "Makes Hospital's Formula Better",
            done() {
                if(hasAchievement("A",11))
                    if(hasAchievement("A",12))
                        if(hasAchievement("A",13)) {   
                    return true
                      
                    
             }
            },
             style(){
                if ((getClickableState("c",11))==1) {
                    if (hasMilestone(this.layer,this.id)) {
                        return{
                            "background-color":"none",
                            "color":"none"
                        } 
                    }
                return{
                    "background-color":"#43007d",
                    "color":"#ff9787"
                }
                } else {
                    if (hasMilestone(this.layer,this.id)) {
                        return{
                            "background-color":"none",
                            "color":"none"
                        } 
                    }
                    return{
                        "background-color":"#ff9787" ,
                        "color":"#43007d"
                    }
                  
    
                }
             },
           
        },
       
    },   

    clickables: {
        11: {
            display() {return "Dark theme"},
            style(){
             return{
             "min-height":"50px",
             "width":"75px",
             "background-color":"black",
             "color":"white"
             }
            },
            canClick(){
                return true
            },
            onClick(){
                if(getClickableState(this.layer,12)==1) setClickableState(this.layer,12,0)
                    setClickableState(this.layer,this.id,1)
            }
        },
        12: {
            display() {return "Light theme"},
            style(){
             return{
             "min-height":"50px",
             "width":"75px",
             "background-color":"white",
             "color":"black"
             }
            },
            canClick(){
                return true
            },
            onClick(){
            
            if(getClickableState(this.layer,11)==1) setClickableState(this.layer,11,0)
                setClickableState(this.layer,this.id,1)
            }
        },
        21: {
           display() {return '<span style ="font-size: 17px"> Perfect Courage!</span>'},
            style(){
            if (getClickableState("c",11)==1) {
                return{
                    "background-color":"Black",
                    "color":"cyan",
                    "min-height":"50px",
                    "width":"125px"
                }
            } else {
                return{
                    "background-color":"yellow",
                    "color":"purple",
                     "min-height":"50px",
                    "width":"125px"
                }
            }
            },
            canClick(){
                return true
            },
            onClick(){
             return pointAdd()
        
            },
            
            unlocked(){
                if(hasUpgrade("c",23))
                    return true 
            },
           
        },
    },
    upgrades: {
    11: {           
    cost: new Decimal(1),
    fullDisplay(){
        if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
            return'<span style="font-size: 17px"> Birth Rate Booster  </span><br><br>'+ 
            format(this.effect())+'x Points <br>'+
            format(this.effect().div(5).add(1))+'x prestige point <br>'+
            "Cost:"+this.cost
     
        } else {
            return'<span style="font-size: 17px"> Birth Rate Booster  </span><br><br>'+ 
            format(this.effect())+'x Points <br>'+
            format(this.effect().div(5).add(1))+'x Citizens<br>'+
            "Cost:"+this.cost
        }
        
    },
    style(){
     if (hasUpgrade(this.layer,this.id)) {
    
    if ((getClickableState(this.layer,11)==1)) {
        return {
            "background-color":"#500202",
            "color":"#53cffe",
            "transition":"background-color 1s ease", 
            "margin-right":"10px" 
             
        }
    } else {
        return{
            "background-color":"#53cffe",
            "color":"#500202",
            "transition":"background-color 1s ease", 
            "margin-right":"10px" 
             
        }
    }
     }
     else {
        if ((getClickableState(this.layer,11)==1))  {
            return {
                "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#850101",
                "margin-right":"10px"
                  }
                
        } else {
            return {
                "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
        'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
     "color":"#210037", 
                "margin-right":"10px"
                  }
        }
     }
       
     
    },
    effect(){
      let effect=new Decimal(2) 
      if(hasUpgrade(this.layer,12)) effect=effect.mul(upgradeEffect(this.layer,12))
      if(getBuyableAmount(this.layer,11).gte(1)) effect=effect.mul(0.6)
        if(hasUpgrade("k",11)) effect=effect.div(0.6)
      return effect  
     
    },

    },
    12: {           
        cost: new Decimal(5),
        fullDisplay(){
            return'<span style="font-size: 17px "> Hospitals  </span><br><br>'+ 
            "Makes Birth rate increase even more and gets stronger based on how many achivement you have <br>"+
            this.effect()+"x Birth Rate <br>"+
            "Cost:"+this.cost
            
        },
        style(){
            if (hasUpgrade(this.layer,this.id)) {
    
                if ((getClickableState(this.layer,11)==1)) {
                    return {
                        "background-color":"#EF0606",
                        "color":"white",
                        "transition":"background-color 1s ease", 
                        "margin-right":"10px" 
                         
                    }
                } else {
                    return{
                        "background-color":"white",
                        "color":"#EF0606",
                        "transition":"background-color 1s ease", 
                        "margin-right":"10px" 
                         
                    }
                }
                 }
                 else {
                    if ((getClickableState(this.layer,11)==1))  {
                        return {
                            "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#850101",
                            "margin-right":"10px"
                              }
                            
                    } else {
                        return {
                            "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                 "color":"#210037", 
                            "margin-right":"10px"
                              }
                    }
                 }
        },
        effect(){
            let effect=new Decimal(2.5) 
            let achReward= new Decimal(2)
            if(hasMilestone("c",3)) achReward= new Decimal(3)
            if(hasAchievement("A",11)) effect=effect.mul(1.5)
            for (let i = 11; i <= 35; i++) {
            if ((i >= 11 && i <= 15) || (i >= 21 && i <= 25) || (i >= 31 && i <= 35)) {
            if (hasAchievement('A', i)) {
            effect = effect.mul(achReward);
                    }
                }
            }
            return effect  
          },
          unlocked(){
          if(!hasUpgrade(this.layer,11 ))return false
          else return true
          }
          
        },

        13: {           
            cost: new Decimal(10),
            fullDisplay(){
                return'<span style="font-size: 17px">Homes</span><br><br>'+
                "Decreases citizen amount of dying because of home deficiency <br>"+
                
                format(this.effect())+'x<br>'+
                "Cost:"+this.cost
         
            },
            style(){
                if (hasUpgrade(this.layer,this.id)) {
    
                    if ((getClickableState(this.layer,11)==1)) {
                        return {
                            "background-color":"brown",
                            "color":"#f8fa76",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px" 
                             
                        }
                    } else {
                        return{
                            "background-color":"#f8fa76",
                            "color":"brown",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px" 
                             
                        }
                    }
                     }
                     else {
                        if ((getClickableState(this.layer,11)==1))  {
                            return {
                                "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#850101",
                                "margin-right":"10px"
                                  }
                                
                        } else {
                            return {
                                "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                        'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                     "color":"#210037", 
                                "margin-right":"10px"
                                  }
                        }
                     }  
            },
            effect(){
                let effect=new Decimal(1) 
                effect=effect.add(player.c.points.pow(0.5))
                return effect  
              },
              unlocked(){
              if(!hasUpgrade(this.layer,12 ))return false
              else return true
              }
              
            },
            21: {           
                cost: new Decimal(25),
                fullDisplay(){
                    if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
                        return'<span style="font-size: 17px"> At least 3 child guarantee  </span><br><br>'+ 
                        this.effect()+'x Points <br>'+
                        this.effect().div(10)+'x Citizens <br>'+
                        "Cost:"+this.cost
                 
                    } else {
                        return'<span style="font-size: 17px"> At least 3 child guarantee  </span><br><br>'+ 
                        this.effect()+'x Points <br>'+
                        this.effect().div(10)+'x Citizens <br>'+
                        "Cost:"+this.cost
                    }
                    
                },
                style(){
                 if (hasUpgrade(this.layer,this.id)) {
                
                if ((getClickableState(this.layer,11)==1)) {
                    return {
                        "background-color":"#500202",
                        "color":"#53cffe",
                        "transition":"background-color 1s ease", 
                        "margin-right":"10px" ,
                        "margin-top":"20px"
                         
                    }
                } else {
                    return{
                        "background-color":"#53cffe",
                        "color":"#500202",
                        "transition":"background-color 1s ease", 
                        "margin-right":"10px" ,
                        "margin-top":"20px"
                         
                    }
                }
                 }
                 else {
                    if ((getClickableState(this.layer,11)==1))  {
                        return {
                            "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
                'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
             "color":"#850101",
                            "margin-right":"10px",
                            "margin-top":"20px"
                              }
                            
                    } else {
                        return {
                            "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                 "color":"#210037", 
                            "margin-right":"10px",
                            "margin-top":"20px"
                              }
                    }
                 }
                   
                 
                },
                effect(){
                  let effect=new Decimal(30) 
                  if(hasUpgrade(this.layer,22)) effect=effect.mul(upgradeEffect(this.layer,22))
                  return effect  
                 
                },
                unlocked(){
                    if(!hasUpgrade(this.layer,13 ))return false
                    else return true
                    }
                }, 
                22: {           
                    cost: new Decimal(40),
                    fullDisplay(){
                        if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
                            return'<span style="font-size: 17px"> Qualified doctors  </span><br><br>'+ 
                            "Gives at least 2 survival child guarantee at each birth"+
                            this.effect()+'x Child guarantee <br>'+
                            
                            "Cost:"+this.cost
                     
                        } else {
                            return'<span style="font-size: 17px">  Qualified doctors  </span><br><br>'+ 
                            "Gives at least 2 survival child guarantee at each birth<br>"+
                            this.effect()+'x Child guarantee <br>'+
                            
                            "Cost:"+this.cost
                        }
                        
                    },
                    style(){
                     if (hasUpgrade(this.layer,this.id)) {
                    
                    if ((getClickableState(this.layer,11)==1)) {
                        return {
                            "background-color":"#EF0606",
                            "color":"white",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px",
                            "margin-top":"20px"
                             
                        }
                    } else {
                        return{
                            "background-color":"white",
                            "color":"#EF0606",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px" ,
                            "margin-top":"20px"
                             
                        }
                    }
                     }
                     else {
                        if ((getClickableState(this.layer,11)==1))  {
                            return {
                                "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
                    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                 "color":"#850101",
                                "margin-right":"10px",
                                "margin-top":"20px"
                                  }
                                
                        } else {
                            return {
                                "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                        'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                     "color":"#210037", 
                                "margin-right":"10px",
                                "margin-top":"20px"
                                  }
                        }
                     }
                       
                     
                    },
                    effect(){
                      
                      let reward = new Decimal(2);
                      for (let i = 1; i <= 20; i++) {
                      if ((i >= 1 && i <= 20) ) {
                      if (hasMilestone('c', i)) {
                      reward = reward.mul(2);
                      
                   }
                       }
                             }
                      return reward  
                     
                                },
                    unlocked(){
                        if(!hasUpgrade(this.layer,21 ))return false
                        else return true
                        }
                    }, 
                    23: {           
                        cost: new Decimal(50),
                        fullDisplay(){
                            if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
                                return'<span style="font-size: 17px"> Apartments </span><br><br>'+ 
                                "Hard winter cause lot of citizen loss so you build them more homes! <br>"+
                                format(this.effect())+'x  <br>'+
                                "Cost:"+this.cost
                         
                            } else {
                                return'<span style="font-size: 17px"> Apartments  </span><br><br>'+ 
                                "Hard winter cause lot of citizen loss so you build them more homes! <br>"+
                                format(this.effect())+'x  <br>'+
                                "Cost:"+this.cost
                            }
                            
                        },
                        style(){
                         if (hasUpgrade(this.layer,this.id)) {
                        
                        if ((getClickableState(this.layer,11)==1)) {
                            return {
                                "background-color":"brown",
                                "color":"#f8fa76",
                                "transition":"background-color 1s ease", 
                                "margin-right":"10px",
                                "margin-top":"20px"
                                 
                            }
                        } else {
                            return{
                                "background-color":"#f8fa76",
                                "color":"brown",
                                "transition":"background-color 1s ease", 
                                "margin-right":"10px",
                                "margin-top":"20px" 
                                 
                            }
                        }
                         }
                         else {
                            if ((getClickableState(this.layer,11)==1))  {
                                return {
                                    "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
                        'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                     "color":"#850101",
                                    "margin-right":"10px",
                                    "margin-top":"20px"
                                      }
                                    
                            } else {
                                return {
                                    "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                            'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                         "color":"#210037", 
                                    "margin-right":"10px",
                                    "margin-top":"20px"
                                      }
                            }
                         }
                           
                         
                        },
                        effect(){
                            let effect=new Decimal(1) 
                            effect=effect.add(player.c.points.pow(0.8))
                          return effect  
                         
                        },
                        unlocked(){
                            if(!hasUpgrade(this.layer,22 ))return false
                            else return true
                            }
                        },   
 },
 buyables: {
    11: {
    cost(){
       return new Decimal(110)
    }, 
    purchaseLimit: 1,
display() { return'<span style="font-size: 17px">Education Revolution </span><br><br>'+
                "Makes Birth Rate Booster weaker but multiplies point production<br>"+
                this.effect()+"x<br>"+

"Cost:"+this.cost()
 },
canAfford() { if(player.c.points.gte(100)) return true},
buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
style(){
    if (getBuyableAmount(this.layer,this.id).gte(1)) {
    
        if ((getClickableState(this.layer,11)==1)) {
            return {
                "background-color":"#602226",
                "color":"#7af012",
                "transition":"background-color 1s ease", 
                "margin-right":"10px",
                "height":"120px",
                "width":"120px"
            }
        } else {
            return{
                "background-color":"#7af012",
                "color":"#602226",
                "transition":"background-color 1s ease", 
                "margin-right":"10px",
                 "height":"120px",
                "width":"120px"
            }
        }
         }
         else {
            if ((getClickableState(this.layer,11)==1))  {
                return {
                    "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#850101",
                    "margin-right":"10px",
                    "height":"120px",
                "width":"120px"
                      }
                    
            } else {
                return {
                    "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
            'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
         "color":"#210037", 
                    "margin-right":"10px",
                    "height":"120px",
                "width":"120px"
                      }
            }
         }

},
effect(){
    let effect=new Decimal(100) 
    if(getBuyableAmount(this.layer,13).gte(1)){
        effect=effect.mul(2)
    
    }
    return effect  
  },
  unlocked(){
    if(!hasUpgrade(this.layer, 22))return false
    else return true
    }
    },
    12: {
        cost(){
        return    new Decimal(135)
        }, 
        purchaseLimit: 1,
    display() { return'<span style="font-size: 17px">Economy Revolution</span><br><br>'+
                    "Increase your point production based on your citizen amount <br>"+
                 format(this.effect())+"x <br>"+
    
                     "Cost:"+this.cost()
     },
    canAfford() { if(player.c.points.gte(40)) return true},
    buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
    style(){
        if (getBuyableAmount(this.layer,this.id).gte(1)) {
    
            if ((getClickableState(this.layer,11)==1)) {
                return {
                    "background-color":"#00140A",
                    "color":"#F6C913",
                    "transition":"background-color 1s ease", 
                    "margin-right":"10px",
                    "height":"120px",
                    "width":"120px"
                }
            } else {
                return{
                    "background-color":"#F6C913",
                    "color":"#00140A",
                    "transition":"background-color 1s ease", 
                    "margin-right":"10px",
                     "height":"120px",
                    "width":"120px"
                }
            }
             }
             else {
                if ((getClickableState(this.layer,11)==1))  {
                    return {
                        "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#850101",
                        "margin-right":"10px",
                        "height":"120px",
                    "width":"120px"
                          }
                        
                } else {
                    return {
                        "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
             "color":"#210037", 
                        "margin-right":"10px",
                        "height":"120px",
                    "width":"120px"
                          }
                }
             }  
    },
    effect(){
        let effect=new Decimal(1) 
                effect=effect.add(player.c.points.pow(0.8))
        if(getBuyableAmount(this.layer,13).gte(1)){
            effect=effect.mul(2)
        }
        return effect  
      },
      unlocked(){
        if(!getBuyableAmount(this.layer, 11).gte(1))return false
        else return true
        }
        },
        13: {
            cost(x){
                let cost=new Decimal(160)
                
                return cost
            },
            purchaseLimit: 1,
        display() { 
        if (getBuyableAmount(this.layer,this.id).eq(12)) {
         return '<span style="font-size: 17px">Technology Revolution</span><br><br>'+
                        "Makes your first and second kingdom upgrade 2 times better!<br>"+
        
        "Cost:"+this.cost()+"<br>"  
         
        }
         else {
            return'<span style="font-size: 17px">Technology Revolution</span><br><br>'+
                        "Makes your first and second kingdom upgrade better!<br>"+
                this.effect()+"x <br>"+
        
        "Cost:"+this.cost()+"<br>"
        
        }
         },
        canAfford() { if(player.c.points.gte(this.cost())) return true},
        buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
        style(){
            if (getBuyableAmount(this.layer,this.id).gte(1)) {
    
                if ((getClickableState(this.layer,11)==1)) {
                    return {
                        "background-color":"black",
                        "color":"#00fff4",
                        "transition":"background-color 1s ease", 
                        "margin-right":"10px",
                        "height":"120px",
                        "width":"120px"
                    }
                } else {
                    return{
                        "background": "#00fff4",
    
 "color":"black",
                        "transition":"background-color 1s ease", 
                        "margin-right":"10px",
                         "height":"120px",
                        "width":"120px"
                    }
                }
                 }
                 else {
                    if ((getClickableState(this.layer,11)==1))  {
                        return {
                            "background-color":"black",
                            "color":"#910303 ",
                            "margin-right":"10px",
                            "height":"120px",
                        "width":"120px"
                              }
                            
                    } else {
                        return {
                            "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                 "color":"#210037", 
                            "margin-right":"10px",
                            "height":"120px",
                        "width":"120px"
                              }
                    }
                 }     
        },
        effect(){
           let effect=new Decimal(2)
           
            
            return effect  
          },
          unlocked(){
            if(!getBuyableAmount(this.layer, 12).gte(1))return false
            else return true
            }
            },
            21: {
                cost(x){
                    let cost=new Decimal(120)
                    cost=cost.add(x.mul(10))
                    if(hasMilestone("c",2)){
                        cost=cost.sub(20)
                        
                    }
                    return cost
                },
                purchaseLimit: 10,
            display() { 
            if (getBuyableAmount(this.layer,this.id).eq(10)) {
             return '<span style="font-size: 17px">Information Gathering</span><br><br>'+
                            "Makes it easier to reach Kingdom layer!<br>"+
            
            "Cost:"+this.cost()+"<br>"+
            "Maximum Amount:10/10"
               
             
            } else {
                return'<span style="font-size: 17px">Information Gathering</span><br><br>'+
                            "Makes it easier to reach Kingdom layer!<br>"+
            
            "Cost:"+this.cost()+"<br>"+
            "Amount:"+getBuyableAmount(this.layer,this.id)
            }
             },
            canAfford() { if(player.c.points.gte(this.cost())) return true},
            buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
            style(){
                if (getBuyableAmount(this.layer,this.id).gte(1)) {
                    if(getBuyableAmount(this.layer,this.id).gte(10)){
                      return{
                        "background-color":"gray",
                        "color":"black",
                        "margin-top":"350px",
                        "height":"75px",
                        "width":"300px",
                        "border":"none",
                        "border-radius":"10px",
                      }     
                    }
                    if ((getClickableState(this.layer,11)==1)) {
                        return {
                            "background":"linear-gradient(90deg, rgba(12,42,15,1) 0%, rgba(46,3,80,1) 51%, rgba(13,59,69,1) 100%)",
                            "color":"white",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px",
                            "margin-top":"350px",
                        "height":"75px",
                        "width":"300px",
                        "border-radius":"10px",
                        "border":"none",
                        }
                    } else {
                        return{
                            "background":"linear-gradient(90deg, rgba(255,151,135,1) 0%, rgba(255,215,132,1) 51%, rgba(254,139,255,1) 100%)",
                            "color":"black",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px",
                             "margin-top":"350px",
                        "height":"75px",
                        "width":"300px",
                        "border-radius":"10px",
                        "border":"none",
                        }
                    }
                     }
                     else {
                        if ((getClickableState(this.layer,11)==1))  {
                            return {
                                "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
            'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
         "color":"#850101",
                                "margin-right":"10px",
                                "margin-top":"350px",
                        "height":"75px",
                        "width":"300px",
                        "border-radius":"10px",
                        
                                  }
                                
                        } else {
                            return {
                                "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                        'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                     "color":"#210037", 
                                "margin-right":"10px",
                               "margin-top":"350px",
                        "height":"75px",
                        "width":"300px",
                        "border-radius":"10px",
                        "border":"none",
                                  }
                        }
                     }  
            },
            effect(){
               let effect=new Decimal(25)
               effect=effect.mul(getBuyableAmount(this.layer,this.id))
                
                return effect  
              },
              unlocked(){
                if(!getBuyableAmount(this.layer, 13).gte(1))return false
                else return true
                }
                },
                
    
},
 nodeStyle(){
    if (getClickableState(this.layer,11)==1) return { 
      "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#850101",   
    } 
    else return {
        "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#210037",
        
    }
 },
   componentStyles: {
    
   "prestige-button"() {
    if (getClickableState("c",11)==1) return {
        "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#850101",   
         }
        
        
    else return {
        "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
 "color":"#210037",
       
       
    }

}
},

})
addLayer("k", {
  
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

                         // The color for this layer, which affects many elements.
    resource: "Kingdoms",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "Citizens",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.c.points },  // A function to return the current amount of baseResource.

    requires(){
   let req=new Decimal(500)
   req=req.sub(buyableEffect("c",21))
   return req
    },          
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            
            cost(){
                let cost= new Decimal(1)
                if(hasUpgrade(this.layer,12)) cost=cost.mul(10)
                if(hasUpgrade(this.layer,13)) cost=cost.mul(10)
                if(hasUpgrade(this.layer,14)) cost=cost.mul(10)
                    return cost
            },
            fullDisplay(){
                if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
                    return'<span style="font-size: 17px"> Entering Elfheim Forest </span><br><br>'+ 
                    'This will cleanse side effects of "Education Revolution"<br> '+
                    this.effect()+'x points <br>'+
                    
                    "Cost:"+this.cost()
             
                } else {
                    return'<span style="font-size: 17px"> Elfheim Forest  </span><br><br>'+ 
                    'This will cleanse side effects of "Education Revolution"<br> '+
                    "Cost:"+this.cost()
                }
                
            },
            style(){
                if (hasUpgrade(this.layer,this.id)) {
    
                    if ((getClickableState("c",11)==1)) {
                        return {
                            "background-color":"#602226",
                            "color":"#7af012",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px",
                            "height":"120px",
                            "width":"120px"
                        }
                    } else {
                        return{
                            "background-color":"#7af012",
                            "color":"#602226",
                            "transition":"background-color 1s ease", 
                            "margin-right":"10px",
                             "height":"120px",
                            "width":"120px"
                        }
                    }
                     }
                     else {
                        if ((getClickableState("c",11)==1))  {
                            return {
                                "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
                'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
             "color":"#850101",
                                "margin-right":"10px",
                                "height":"120px",
                            "width":"120px"
                                  }
                                
                        } else {
                            return {
                                "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                        'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                     "color":"#210037", 
                                "margin-right":"10px",
                                "height":"120px",
                            "width":"120px"
                                  }
                        }
                     }
            
            },
            effect(){
              let effect=new Decimal(1) 
              
              return effect  
            }
        
            },
            12: {
            
                cost(){
                    let cost= new Decimal(1)
                    if(hasUpgrade(this.layer,12)) cost=cost.mul(10)
                    if(hasUpgrade(this.layer,13)) cost=cost.mul(10)
                    if(hasUpgrade(this.layer,14)) cost=cost.mul(10)
                        return cost
                },
                fullDisplay(){
                    if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
                        return'<span style="font-size: 17px"> Entering Goblin Cave </span><br><br>'+ 
                        this.effect()+'x points <br>'+
                        
                        "Cost:"+this.cost()
                 
                    } else {
                        return'<span style="font-size: 17px"> Entering Goblin Cave  </span><br><br>'+ 
                        "Boosts Education Upgrade <br>"+
                        "Cost:"+this.cost()
                    }
                    
                },
                style(){
                    if (hasUpgrade(this.layer,this.id)) {
    
                        if ((getClickableState("c",11)==1)) {
                            return {
                                "background-color":"#602226",
                                "color":"#7af012",
                                "transition":"background-color 1s ease", 
                                "margin-right":"10px",
                                "height":"120px",
                                "width":"120px"
                            }
                        } else {
                            return{
                                "background-color":"#7af012",
                                "color":"#602226",
                                "transition":"background-color 1s ease", 
                                "margin-right":"10px",
                                 "height":"120px",
                                "width":"120px"
                            }
                        }
                         }
                         else {
                            if ((getClickableState("c",11)==1))  {
                                return {
                                    "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
                    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                 "color":"#850101",
                                    "margin-right":"10px",
                                    "height":"120px",
                                "width":"120px"
                                      }
                                    
                            } else {
                                return {
                                    "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                            'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                         "color":"#210037", 
                                    "margin-right":"10px",
                                    "height":"120px",
                                "width":"120px"
                                      }
                            }
                         }
                
                },
                effect(){
                  let effect=new Decimal(2) 
                  if(hasUpgrade(this.layer,12)) effect=effect.mul(upgradeEffect(this.layer,12))
                  return effect  
                }
            
                },
                13: {
            
                    cost(){
                        let cost= new Decimal(1)
                        if(hasUpgrade(this.layer,12)) cost=cost.mul(10)
                        if(hasUpgrade(this.layer,13)) cost=cost.mul(10)
                        if(hasUpgrade(this.layer,14)) cost=cost.mul(10)
                            return cost
                    },
                    fullDisplay(){
                        if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
                            return'<span style="font-size: 17px"> Entering Logres Kingdom </span><br><br>'+ 
                            this.effect()+'x points <br>'+
                            
                            "Cost:"+this.cost()
                     
                        } else {
                            return'<span style="font-size: 17px"> Entering Logres Kingdom  </span><br><br>'+ 
                            "Boosts Education Upgrade <br>"+
                            "Cost:"+this.cost()
                        }
                        
                    },
                    style(){
                        if (hasUpgrade(this.layer,this.id)) {
    
                            if ((getClickableState("c",11)==1)) {
                                return {
                                    "background-color":"#602226",
                                    "color":"#7af012",
                                    "transition":"background-color 1s ease", 
                                    "margin-right":"10px",
                                    "height":"120px",
                                    "width":"120px"
                                }
                            } else {
                                return{
                                    "background-color":"#7af012",
                                    "color":"#602226",
                                    "transition":"background-color 1s ease", 
                                    "margin-right":"10px",
                                     "height":"120px",
                                    "width":"120px"
                                }
                            }
                             }
                             else {
                                if ((getClickableState("c",11)==1))  {
                                    return {
                                        "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
                        'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                     "color":"#850101",
                                        "margin-right":"10px",
                                        "height":"120px",
                                    "width":"120px"
                                          }
                                        
                                } else {
                                    return {
                                        "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                                'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                             "color":"#210037", 
                                        "margin-right":"10px",
                                        "height":"120px",
                                    "width":"120px"
                                          }
                                }
                             }
                    
                    },
                    effect(){
                      let effect=new Decimal(2) 
                      if(hasUpgrade(this.layer,12)) effect=effect.mul(upgradeEffect(this.layer,12))
                      return effect  
                    }
                
                    },
        14: { 
            cost(){
                let cost= new Decimal(1)
                if(hasUpgrade(this.layer,12)) cost=cost.mul(10)
                if(hasUpgrade(this.layer,13)) cost=cost.mul(10)
                if(hasUpgrade(this.layer,14)) cost=cost.mul(10)
            return cost
                        },
        fullDisplay(){
                if (!hasUpgrade(this.layer,this.id)&&player.c.points.lt(this.cost)) {
            return'<span style="font-size: 17px"> Digging Into Underground Kingdom </span><br><br>'+ 
                    this.effect()+'x points <br>'+
                    "Cost:"+this.cost()
                         
                } else {
            return'<span style="font-size: 17px"> Digging Into Underground Kingdom  </span><br><br>'+ 
                    "Boosts Education Upgrade <br>"+
                    "Cost:"+this.cost()
                            }
                            
                        },
                        style(){
                            if (hasUpgrade(this.layer,this.id)) {
    
                                if ((getClickableState("c",11)==1)) {
                                    return {
                                        "background-color":"#602226",
                                        "color":"#7af012",
                                        "transition":"background-color 1s ease", 
                                        "margin-right":"10px",
                                        "height":"120px",
                                        "width":"120px"
                                    }
                                } else {
                                    return{
                                        "background-color":"#7af012",
                                        "color":"#602226",
                                        "transition":"background-color 1s ease", 
                                        "margin-right":"10px",
                                         "height":"120px",
                                        "width":"120px"
                                    }
                                }
                                 }
                                 else {
                                    if ((getClickableState("c",11)==1))  {
                                        return {
                                            "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 96%, rgba(255,0,35,1) 99%)",
                            'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                         "color":"#850101",
                                            "margin-right":"10px",
                                            "height":"120px",
                                        "width":"120px"
                                              }
                                            
                                    } else {
                                        return {
                                            "background": "radial-gradient(circle, rgba(249,249,249,1) 0%, rgba(196,118,247,1) 100%)",
                                    'box-shadow': "0 0 15px #000000, 0 0 30px #292929",
                                 "color":"#210037", 
                                            "margin-right":"10px",
                                            "height":"120px",
                                        "width":"120px"
                                              }
                                    }
                                 }
                        
                        },
                        effect(){
                          let effect=new Decimal(2) 
                          if(hasUpgrade(this.layer,12)) effect=effect.mul(upgradeEffect(this.layer,12))
                          return effect  
                        }
                    
                        }
        
    },
    tabFormat: {
        "Kingdom Shop": {
            content: [
  
              ["infobox", "lore"],
              "main-display",
              "prestige-button",
              "blank",
              "resource-display",
              
  
            ],
  
        },
        "Elfhenheim Forest": {
            content:[
                ["upgrade", "11"]
            ]
        },
        "Goblin Cave": {
            content:[
                ["upgrade", "12"]
            ]
        },
        "Logres Kingdom": {
            content:[
                ["upgrade", "13"]
            ]
        },
        "Underground Kingdom": {
            content:[
                ["upgrade", "14"]
            ]
        },
        "Challenges": {
            content: [              
              "blank",
              "challenges",
              "blank"
            ],
  
  
        },
  
  },
  challenges: {
    11: {
    name: "Ending Rebel Forces",
    challengeDescription: "description of ouchie",
    canComplete: function() {return player.points.gte(100)},
    goalDescription:"Earn 100 Citiziens",
    rewardDescription:"Makes Upgrade 3 stronger",

    style(){
       if (inChallenge(this.layer,11)){
        return{
       
        "border-radius":"50px"

       }
       }else {
        return{
        
        "border-radius":"50px"
    }
       }    
        }
    },
},
nodeStyle() {
    if (player.k.unlocked) {
        if (getClickableState("c",11)==1) {
            return{
                "background":  "radial-gradient(circle, rgba(90,3,116,1) 0%, rgba(116,3,3,1) 100%)",
        "color":"Pink"
            }
        } else {
            return{
                "background":"radial-gradient(circle, rgba(95,246,255,1) 0%, rgba(187,255,140,1) 100%)",
           "color":"Gray"
            }
        }
    } else {
        return{
            "background":"#ff9787",
            "color":"none"
        }
    }
  },

    componentStyles: {
       "prestige-button"() { return {
           'color': '#AA66AA',
           "background-color":"#000000" } }
       
   },
})

import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";
import { ui } from "../api/ui/UI"
import { Sound } from "../api/UI/Sound"
import { ImageSource } from "../api/ui/properties/ImageSource";
import { Color } from "../api/ui/properties/Color";


var id = "russo888888";
var name = "TCL Theory";
var description = "TCL = Telegram Contact Links";
var authors = "skyhigh173";
var version = 3;

// string.count(substring)
function occurrences(e,n,r){if(e+="",(n+="").length<=0)return e.length+1;for(var t=0,f=0,c=r?1:n.length;;)if((f=e.indexOf(n,f))>=0)++t,f+=c;else break;return t}

var tag = {
  ct: "custom theory",
  ui_ct: "UI based custom theory",
  auto: "automator",
  other: "other/fun",
  troll: "TROLL"
}
 
var cts = [
  {name: 'qrname60967 (Theory Owner)', author: 'nobody', tag:tag.auto, description: 'lmao canceled telegram premium', link:'https://t.me/qrname60967'},
  //{name: '', author:'', description: "", tag: '', link: ''},
];

// @ => \n , & => \\dot{\\rho}
// * = equation too long, modified
var eqs = [
  // QoL
  ["\\text{No equation available.}","",""],
  // sin
  ["& = f + c\\frac{t^p}{10dt}\\cos(t)","\\tau_i=(\\max\\rho)^{0.2}, \\dot{c} = c_1 c_2 dt @ dt=\\min\\{1,\\log_{10}(c)^{0.75}\\}","c=1,l=0,dt=1"],
  // spiral*
  ["x = L\\cos(\\theta)+r_2\\cos(\\theta Lr_1^{-1}) @ L=R-r_1 @ y = L\\sin(\\theta)-r_2\\sin(\\theta Lr_1^{-1}) @ r_2=r_2","& = \\frac{r_1r_2R}{\\gcd(R,r_1)} \\cdot q\\sqrt{x^2+y^2}","q=1\\qquad\\gcd(R,r_1)=0"],
  // BT
  ["&=(tai)(rao) + \\left( \\frac{\\int_0^{tai \\times (e^{\\pi i}+1)} x^{0.01C}dx}{\\frac{d}{dx}(1.71C^{1.7x}|x=rao)} \\right)","",""],
  // Fission  (omg finally a short one)
  ["P = \\sum DE_s + \\sum RE_s","\\tau_i=\\max P^{0.76}",""],
  // Weyl
  ["& = q \\cdot 2^{\\ell(w)}, \\dot{q} = \\frac{q_1q_2q_3}{10}, \\tau_i=\\max\\rho^{0.1}","\\text{Type} = A_3 @ w = *","q = 0.0, \\ell(w)=0"],
  // ELS
  ["& = q_1q_2 \\sqrt{s} \\qquad s = \\sum^n_{j=1} \\left(1 + \\frac{k}{j} \\right)^j","q_1q_2 = 0.00","\\tau_i = \\max \\rho"],
  // Trig
  ["& = \\frac{a_1q + a_2q^2}{|\\varrho| + 10^{-k}}","\\varrho = \\sum_{n=0}^\\vartheta \\frac{(-1)^nx^{2n+1}}{(2n+1)!} \\qquad \\tau_i=\\max\\rho^{0.4}","x=0.00 \\qquad &=0.00 \\qquad \\varrho = 0.01 \\qquad q=1.00"],
  // TC*
  ["& = r\\sqrt{c_1\\dot{T}^2} @ \\dot{r} = \\frac{r_1r_2}{1+\\log_{10}(1+|e(t)|)} @ \\dot{T}=\\begin{cases} u(t)(200-T) : u(t)>0 @ u(t)(T-30) : u(t)<0 \\end{cases}","e(t) = T_s - T @ u(t) = 0 @ \\tau_i=\\max\\rho^{0.2}","T=100.00,T_s=100,e(t)=0.00,r=1.00",12],
  // Cookie
  ["C = P(B(0) + P_{cp}\\sum_{i=1}^{18} B(i))","M = M_iK(0.2)+(K-10)(0.3)@+(K-25)(0.4)+(K-50)(0.5)","\\tau_i=\\max C^{0.2}"],
  // Gen Func
  // TODO : lazy, but will add later, soon™
]


// multi line eq support
eqs = eqs.map(x => {
  let f = (j) => {
    let a = j.split("@").join("\\\\").split("&").join("\\dot{\\rho}");
    return "$\\begin{matrix} " + a + " \\end{matrix}$";
  }
  return [f(x[0]),f(x[1]),f(x[2])];
});

// add ID (0...length-1) to each theory
for (let i = 0; i < cts.length; i++) {cts[i].id = i}


var showCT = [];
var selectType = 0;

function popupInfo(i){

    Sound.playClick();
    let tags = showCT[i].tag == undefined ? "custom theory" : showCT[i].tag;
    let h = showCT[i].description;
    let desc = ui.createLabel({
        text: h + (tags === tag.troll ? '\n\nTHIS IS A TROLL THEORY. DO NOT DOWNLOAD THIS IN YOUR MAIN SAVE. IT MAY LOCK YOUR GAME.' : ''),
        horizontalOptions: LayoutOptions.CENTER,
        //verticalOptions: LayoutOptions.CENTER,
        fontSize:16
    });
    
    h = Math.max(Math.min((h.length / 40 + occurrences(h,'\n',false)) * 20,175),40);
  
    let eq = eqs[showCT[i].id];
    if(eq == undefined) {eq = ["No equation available (in dev)","",""]}
    let equi = ui.createPopup({title:"equations",content: ui.createGrid({
      rowDefinitions: ["2*","2*","1*"],
      children: [
        ui.createLatexLabel({row:0,text:eq[0],horizontalOptions: LayoutOptions.CENTER, fontSize:eq[3] == undefined ? 15 : eq[3]}),
        ui.createLatexLabel({row:1,text:eq[1],horizontalOptions: LayoutOptions.CENTER, fontSize:12, textColor:Color.fromRgb(0.8,0.8,0.8)}),
        ui.createLatexLabel({row:2,text:eq[2],horizontalOptions: LayoutOptions.CENTER, fontSize:11, textColor:Color.fromRgb(0.6,0.6,0.6)}),
      ]
    })})
  
    let popupui = [
        ui.createProgressBar({progress: 0}),
        ui.createLabel({text: 'author',horizontalOptions: LayoutOptions.CENTER,fontSize:22}),
        ui.createLabel({text: showCT[i].author,horizontalOptions: LayoutOptions.CENTER}),
        ui.createProgressBar({progress: 0}),
        ui.createLabel({text: 'description',horizontalOptions: LayoutOptions.CENTER,fontSize:22}),
        ui.createScrollView({children:[desc]}),
        //ui.createFrame({heightRequest:h,cornerRadius:5,children:[ui.createScrollView({children:[desc]})]}),
        ui.createLabel({text:'tag : ' + tags, fontSize:15, horizontalOptions: LayoutOptions.CENTER, verticalOptions: LayoutOptions.CENTER}),
        ui.createProgressBar({progress: 0}),
        ui.createButton({text:"equations",fontSize:20,onClicked:()=>{Sound.playClick();equi.show()}}),
        ui.createProgressBar({progress: 0}),
        ui.createLabel({text:'link',horizontalOptions: LayoutOptions.CENTER,fontSize:22}),
        ui.createEntry({
            text: showCT[i].link,
            horizontalOptions: LayoutOptions.CENTER,
            fontSize:10
        })
    ];

    popupui = ui.createStackLayout({
        children:popupui
    });

    let result = ui.createPopup({
        title: showCT[i].name,
        content: popupui
    });

    result.show();
}
function filter(text){

    showCT = cts;
    showCT.sort((a,b) => {
        a = a.name.toUpperCase();
        b = b.name.toUpperCase();
        return a > b ? 1 : (a == b ? 0 : -1)
    });
  
    if (text == '') return;

    showCT = [];

    for (let k = 0; k < cts.length;k++){
        if (cts[k].name.toUpperCase().indexOf(text.toUpperCase()) > -1){
            showCT.push(cts[k])
        }
    }
    
    return showCT;
    
}
var generateButton = () => {
    result = []
    for (let i = 0; i < showCT.length; i++) {
        result.push(
            ui.createButton({
                text:showCT[i].name,
                fontSize:20,
                onClicked: function(){popupInfo(i)}
            })
        );
    }

    result.push(
        ui.createLabel({
            text:showCT.length.toString() + ' theories found',
            horizontalOptions: LayoutOptions.CENTER,
            textColor: Color.fromRgb(0.3,0.3,0.3)
        })
    );
    
    result = ui.createStackLayout({children: result});
    
    return result;
}

var isShowed = false;

var scrV = ui.createScrollView({
  content: generateButton()
});

var entry = ui.createEntry({
  column:1,
  onTextChanged:function(old,newer){
    filter(newer); 
    scrV.content = generateButton();
  }
});
var getUIDelegate = () => {
    let rUI = () => ui.createStackLayout({
        children: [
            ui.createGrid({
              columnDefinitions: ['1*','1*'],
              minimumHeightRequest: 100,
              isVisible: () => isShowed,
              children: [
                ui.createButton({column:0,text:'Normal CT'}),
                ui.createButton({column:1,text:'Abnormal CT'}),
              ]
            }),
            ui.createGrid({
              columnDefinitions: ['0*','10*'],
              minimumHeightRequest: 25*(ui.screenHeight/667),
              heightRequest: 25*(ui.screenHeight/667),
              children:[
                ui.createButton({
                  text: () => isShowed ? '^' : 'v',
                  onClicked: () => {
                    isShowed = !isShowed;
                  }
                }),
                entry,
              ]
            }),
            ui.createGrid({heightRequest:10}),
            scrV
        ]
    });

    return rUI();
}

filter('');
scrV.content = generateButton();

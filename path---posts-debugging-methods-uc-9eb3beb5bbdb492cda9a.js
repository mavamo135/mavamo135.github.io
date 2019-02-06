webpackJsonp([0x73bc5cc999ce],{550:function(e,n){e.exports={data:{site:{siteMetadata:{title:"MyBlog"}},markdownRemark:{html:'<pre><code class="language-c">#define SIZE 100\nuint8_t Debug_Buffer[SIZE][2];\nunsigned int Debug_Cnt=0;\nvoid Debug_Dump(void){ // dump P1IN and P2OUT\n  if(Debug_Cnt &#x3C; SIZE){\n    Debug_Buffer[Debug_Cnt][0] = P1IN;\n    Debug_Buffer[Debug_Cnt][1] = P2OUT;\n    Debug_Cnt++;\n  }\n}\n\n#define SIZE 100\nuint8_t Debug_Buffer[SIZE][2];\nunsigned int Debug_Cnt=0;\nvoid Debug_FilteredDump(void){ // dump P1IN and P2OUT\n  if((P1IN&#x26;0x80)&#x26;&#x26;(Debug_Cnt &#x3C; SIZE)){\n    Debug_Buffer[Debug_Cnt][0] = P1IN;\n    Debug_Buffer[Debug_Cnt][1] = P2OUT;\n    Debug_Cnt ++;\n  }\n}\n\n#define LEDOUT (*((volatile uint8_t *)(0x42000000+32*0x4C02+4*0)))\n#define Debug_HeartBeat() (LEDOUT ^= 0x01) \n</code></pre>\n<p>Next, you add Debug_HeartBeat(); statements at strategic places within the system.\nPort 1 must be initialized so that bit 0 is an output before the debugging begins.\nYou can either observe the LED directly or look at the LED control signals with a high-speed oscilloscope or logic analyzer.\nWhen using LED monitors it is better to modify just the one bit, leaving the other 7 as is.\nIn this way, you can have multiple monitors on one port.</p>\n<pre><code class="language-c">uint32_t Debug_time[20];\nuint8_t Debug_place[20];\nuint32_t n;\nvoid Debug_Profile(uint8_t p){\n  if(n &#x3C; 20){\n    Debug_time[n] = STCURRENT; // record current time\n    Debug_place[n] = p;\n  n++;\n  }\n}\nuint32_t sqrt(uint32_t s){\nuint32_t t; // t*t becomes s\nint n; // loop counter\n  Debug_Profile(0);\n  t = s/10+1; // initial guess\n  Debug_Profile(1);\n  for(n = 16; n; --n){ // will finish\n    Debug_Profile(2);\n    t = ((t*t+s)/t)/2;\n  }\n  Debug_Profile(3);\n  return t;\n} \n</code></pre>',frontmatter:{title:"Embedded systems debugging methods",author:"Maximiliano Valencia",date:"22 March, 2018"}}},pathContext:{slug:"/posts/debugging_methods_uc/"}}}});
//# sourceMappingURL=path---posts-debugging-methods-uc-9eb3beb5bbdb492cda9a.js.map
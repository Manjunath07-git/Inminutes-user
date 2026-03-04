import { useState, useEffect } from "react";
const API = "https://inminutes-backend.onrender.com";
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Instrument+Sans:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Instrument Sans',sans-serif;background:#0A0A0F;color:#F5F0E8}
:root{--bg:#0A0A0F;--s:#13131A;--s2:#1C1C28;--a:#FF5C3A;--a2:#FFB547;--t:#F5F0E8;--m:#7A7A8C;--b:rgba(255,255,255,0.07);--g:#3AEFA8}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg)}
.topnav{position:sticky;top:0;z-index:100;background:rgba(10,10,15,0.96);backdrop-filter:blur(20px);padding:14px 16px 0;border-bottom:1px solid var(--b)}
.r1{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.logo{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;color:var(--t)}.logo span{color:var(--a)}
.dbdg{background:rgba(58,239,168,.1);border:1px solid rgba(58,239,168,.2);border-radius:20px;padding:4px 10px;font-size:11px;font-weight:600;color:var(--g)}
.uav{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--a),var(--a2));display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif}
.sbar{display:flex;align-items:center;gap:10px;background:var(--s2);border:1px solid var(--b);border-radius:14px;padding:10px 14px;margin-bottom:14px}
.sbar input{flex:1;background:none;border:none;outline:none;color:var(--t);font-size:14px;font-family:'Instrument Sans',sans-serif}
.sbar input::placeholder{color:var(--m)}
.cats{display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none}.cats::-webkit-scrollbar{display:none}
.cbtn{flex-shrink:0;padding:7px 16px;border-radius:30px;border:1px solid var(--b);background:transparent;color:var(--m);font-size:13px;cursor:pointer;font-family:'Instrument Sans',sans-serif;white-space:nowrap;transition:all .2s}
.cbtn.act{background:var(--a);border-color:var(--a);color:#fff;font-weight:600}
.hero{margin:16px;border-radius:20px;background:linear-gradient(135deg,#1A0A00,#2D1000);border:1px solid rgba(255,92,58,.15);padding:20px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;right:-20px;top:-20px;width:120px;height:120px;background:radial-gradient(circle,rgba(255,92,58,.3),transparent 70%)}
.hlbl{font-size:11px;font-weight:600;color:var(--a);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px}
.hero h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;line-height:1.2;margin-bottom:8px}
.hero p{font-size:13px;color:var(--m);margin-bottom:14px}
.hbtn{background:var(--a);color:#fff;border:none;border-radius:10px;padding:9px 20px;font-size:13px;font-weight:600;cursor:pointer}
.hem{position:absolute;right:20px;bottom:16px;font-size:56px}
.sec{padding:0 16px;margin-bottom:24px}
.stl{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;margin-bottom:14px}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.pcard{background:var(--s);border:1px solid var(--b);border-radius:18px;overflow:hidden;cursor:pointer;transition:transform .2s,border-color .2s}
.pcard:hover{transform:translateY(-2px);border-color:rgba(255,92,58,.25)}
.pimg{height:130px;background:var(--s2);position:relative;overflow:hidden}
.pimg img{width:100%;height:100%;object-fit:cover}
.pimg-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px}
.ob{position:absolute;top:8px;left:8px;background:rgba(0,0,0,.75);border-radius:6px;padding:2px 7px;font-size:10px;color:#aaa;font-weight:600}
.lb{position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,.5);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px}
.lb.on{background:rgba(255,92,58,.3)}
.pinfo{padding:12px}
.pn{font-size:13px;font-weight:600;color:var(--t);margin-bottom:2px;line-height:1.3}
.pp{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--a)}
.pstk{font-size:11px;font-weight:600;margin-top:2px}
.dm{font-size:10px;color:var(--g);font-weight:600;margin-top:2px}
.addbtn{width:100%;margin-top:10px;background:var(--s2);border:1px solid var(--b);border-radius:10px;padding:8px;color:var(--t);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Instrument Sans',sans-serif}
.addbtn:hover{background:var(--a);border-color:var(--a);color:#fff}
.qctrl{display:flex;align-items:center;justify-content:space-between;margin-top:10px}
.qbtn{width:28px;height:28px;border-radius:8px;border:1px solid var(--b);background:var(--s2);color:var(--t);font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center}
.bnav{position:sticky;bottom:0;background:rgba(19,19,26,.97);backdrop-filter:blur(20px);border-top:1px solid var(--b);display:flex;justify-content:space-around;padding:10px 0 16px;z-index:100}
.nvi{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:4px 12px}
.nvi.act .nvico,.nvi.act .nvlbl{color:var(--a)}
.nvico{font-size:22px;color:var(--m)}.nvlbl{font-size:10px;color:var(--m);font-weight:600}
.cbdg{position:relative}.bdot{position:absolute;top:-3px;right:-3px;width:16px;height:16px;background:var(--a);border-radius:50%;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;border:1.5px solid var(--bg)}
.page{padding:16px;padding-bottom:90px}
.ph{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.bk{width:36px;height:36px;border-radius:12px;background:var(--s);border:1px solid var(--b);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;color:var(--t)}
.ptl{font-family:'Syne',sans-serif;font-size:20px;font-weight:800}
.imgslider{height:240px;background:var(--s);border-radius:20px;overflow:hidden;margin-bottom:8px}
.imgslider img{width:100%;height:100%;object-fit:cover}
.imgslider-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:90px}
.imgdots{display:flex;gap:6px;justify-content:center;margin-bottom:14px}
.imgdot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:all .2s}
.imgdot.act{background:#fff;width:16px;border-radius:3px}
.citem{display:flex;align-items:center;gap:12px;background:var(--s);border:1px solid var(--b);border-radius:16px;padding:14px;margin-bottom:10px}
.cie{width:56px;height:56px;border-radius:12px;overflow:hidden;background:var(--s2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px}
.cie img{width:100%;height:100%;object-fit:cover}
.cin{font-size:14px;font-weight:600;margin-bottom:2px}.cip{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--a)}
.ciqc{display:flex;align-items:center;gap:10px;margin-top:8px}
.ciqb{width:26px;height:26px;border-radius:7px;border:1px solid var(--b);background:var(--s2);color:var(--t);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:700}
.rmv{margin-left:auto;background:rgba(255,92,58,.1);border:none;border-radius:8px;padding:6px 10px;font-size:12px;color:var(--a);cursor:pointer;font-weight:600}
.sumbox{background:var(--s);border:1px solid var(--b);border-radius:16px;padding:16px;margin-top:16px}
.sr{display:flex;justify-content:space-between;font-size:13px;color:var(--m);margin-bottom:8px}
.sr.tot{color:var(--t);font-weight:700;font-size:15px;margin-top:8px;padding-top:8px;border-top:1px solid var(--b)}
.chkbtn{width:100%;margin-top:16px;background:linear-gradient(135deg,var(--a),#FF8A5C);border:none;border-radius:14px;padding:15px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif}
.popt{display:flex;align-items:center;gap:14px;background:var(--s);border:1px solid var(--b);border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer}
.popt.sel{border-color:var(--a);background:rgba(255,92,58,.05)}
.pico{font-size:24px;width:44px;height:44px;background:var(--s2);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.radio{width:20px;height:20px;border-radius:50%;border:2px solid var(--b);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.radio.chk{border-color:var(--a)}.radio.chk::after{content:'';width:10px;height:10px;border-radius:50%;background:var(--a)}
.sucwrap{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;text-align:center;padding:20px}
.prfhero{display:flex;align-items:center;gap:14px;background:linear-gradient(135deg,#1A0A00,#1C0800);border:1px solid rgba(255,92,58,.15);border-radius:18px;padding:18px;margin-bottom:20px}
.prfav{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--a),var(--a2));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;font-family:'Syne',sans-serif}
.mi{display:flex;align-items:center;gap:14px;background:var(--s);border:1px solid var(--b);border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer}
.mi:hover{border-color:rgba(255,92,58,.2)}
.mic{font-size:20px;width:40px;height:40px;background:var(--s2);border-radius:10px;display:flex;align-items:center;justify-content:center}
.relgrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.relcard{background:var(--s);border:1px solid var(--b);border-radius:14px;overflow:hidden;cursor:pointer}
.relimg{height:80px;background:var(--s2);overflow:hidden}
.relimg img{width:100%;height:100%;object-fit:cover}
.relimg-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px}
.authwrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:20px}
.authbox{background:var(--s);border:1px solid var(--b);border-radius:24px;padding:28px;width:100%;max-width:400px}
.inp{width:100%;background:var(--s2);border:1px solid var(--b);border-radius:10px;padding:10px 14px;color:var(--t);font-size:14px;font-family:'Instrument Sans',sans-serif;outline:none;margin-bottom:12px}
.inp:focus{border-color:var(--a)}
.inplbl{font-size:12px;font-weight:700;color:var(--m);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px;display:block}
.abtnp{width:100%;background:linear-gradient(135deg,var(--a),#FF8A5C);border:none;border-radius:12px;padding:13px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif}
.alink{text-align:center;font-size:13px;color:var(--m);margin-top:14px;cursor:pointer}
.alink span{color:var(--a);font-weight:600}
.errmsg{background:rgba(255,78,78,.1);border:1px solid rgba(255,78,78,.2);border-radius:10px;padding:10px 14px;font-size:13px;color:#FF4E4E;margin-bottom:12px}
.addrcard{background:var(--s2);border:1px solid var(--b);border-radius:14px;padding:14px;margin-bottom:10px}
.ordcard{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:14px;margin-bottom:10px}
.irow{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.stag{display:inline-flex;font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px}
.sg{background:rgba(58,239,168,.1);color:var(--g);border:1px solid rgba(58,239,168,.2)}
.sy{background:rgba(255,181,71,.1);color:var(--a2);border:1px solid rgba(255,181,71,.2)}
.sb{background:rgba(79,124,255,.1);color:#4F7CFF;border:1px solid rgba(79,124,255,.2)}
.empty{text-align:center;padding:50px 20px;color:var(--m)}
.mov{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:200;display:flex;align-items:flex-end;justify-content:center}
.msh{background:var(--s);border-radius:24px 24px 0 0;padding:24px;width:100%;max-width:430px;max-height:85vh;overflow-y:auto}
.inp-sel{width:100%;background:var(--s2);border:1px solid var(--b);border-radius:10px;padding:10px 14px;color:var(--t);font-size:14px;font-family:'Instrument Sans',sans-serif;outline:none;margin-bottom:12px;cursor:pointer}
`;

export default function UserApp() {
  const [auth, setAuth] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [wish, setWish] = useState(new Set());
  const [selP, setSelP] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [payMethod, setPayMethod] = useState("cod");
  const [selAddr, setSelAddr] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loginForm, setLoginForm] = useState({ email:"", password:"" });
  const [regForm, setRegForm] = useState({ name:"", phone:"", email:"", password:"" });
  const [authErr, setAuthErr] = useState("");
  const [addrModal, setAddrModal] = useState(false);
  const [editAddrId, setEditAddrId] = useState(null);
  const [newAddr, setNewAddr] = useState({ label:"Home", line1:"", city:"", pincode:"", phone:"" });
  const [ordering, setOrdering] = useState(false);
  const [orderErr, setOrderErr] = useState("");

  const fetchProducts = async () => { try { const r = await fetch(`${API}/products`); setProducts(await r.json()); } catch(e) {} };
  const fetchOrders = async (user) => {
    const u = user || auth; if (!u) return;
    try { const r = await fetch(`${API}/orders/user/${u.id}`); setUserOrders(await r.json()); } catch(e) {}
  };
  useEffect(() => { fetchProducts(); const t = setInterval(fetchProducts, 6000); return () => clearInterval(t); }, []);
  useEffect(() => { if (auth) fetchOrders(auth); }, [auth]);

  const doLogin = async () => {
    setAuthErr("");
    try {
      const r = await fetch(`${API}/users/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(loginForm) });
      const d = await r.json();
      if (!r.ok) { setAuthErr(d.error); return; }
      setAuth(d); setPage("home");
    } catch(e) { setAuthErr("Cannot connect. Is backend running?"); }
  };
  const doRegister = async () => {
    setAuthErr("");
    if (!regForm.name||!regForm.phone||!regForm.email||!regForm.password) { setAuthErr("All fields required"); return; }
    try {
      const r = await fetch(`${API}/users/register`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(regForm) });
      const d = await r.json();
      if (!r.ok) { setAuthErr(d.error); return; }
      setAuth(d); setPage("home");
    } catch(e) { setAuthErr("Cannot connect. Is backend running?"); }
  };
  const addAddress = async () => {
    if (!newAddr.line1||!newAddr.city||!newAddr.pincode) { alert("Fill street, city and pincode"); return; }
    try {
      if (editAddrId) {
        // Edit: delete old, add new
        await fetch(`${API}/users/${auth.id}/address/${editAddrId}`, { method:"DELETE" });
      }
      const r = await fetch(`${API}/users/${auth.id}/address`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(newAddr) });
      setAuth(await r.json()); setAddrModal(false); setEditAddrId(null); setNewAddr({label:"Home",line1:"",city:"",pincode:"",phone:""});
    } catch(e) { alert("Error saving address"); }
  };
  const deleteAddress = async (id) => {
    if (!window.confirm("Remove?")) return;
    await fetch(`${API}/users/${auth.id}/address/${id}`, { method:"DELETE" });
    const r = await fetch(`${API}/users/${auth.id}`); setAuth(await r.json());
  };
  const placeOrder = async () => {
    const addrs = auth.addresses||[];
    if (!addrs.length) { setOrderErr("Add a delivery address first"); return; }
    setOrdering(true); setOrderErr("");
    const address = addrs.find(a=>a.id===selAddr)||addrs[0];
    const items = cartItems.map(p=>({ productId:p.id, name:p.name, price:p.price, quantity:cart[p.id], image:(p.images||[])[0]||null }));
    try {
      const r = await fetch(`${API}/orders`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({userId:auth.id,items,paymentMethod:payMethod,address}) });
      const d = await r.json();
      if (!r.ok) { setOrderErr(d.error); setOrdering(false); return; }
      setCart({}); await fetchOrders(auth); await fetchProducts(); setPage("success");
    } catch(e) { setOrderErr("Error placing order"); }
    setOrdering(false);
  };

  const categories = ["All",...new Set(products.map(p=>p.category))];
  const filtered = products.filter(p=>(cat==="All"||p.category===cat)&&p.name.toLowerCase().includes(search.toLowerCase()));
  const cartItems = products.filter(p=>cart[p.id]);
  const subtotal = cartItems.reduce((s,p)=>s+p.price*cart[p.id],0);
  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);
  const addCart = (id) => { const p=products.find(x=>x.id===id); if(!p) return; const cur=cart[id]||0; if(cur>=p.qty){alert(`Only ${p.qty} available!`);return;} setCart(c=>({...c,[id]:cur+1})); };
  const updQty = (id,d) => { const p=products.find(x=>x.id===id); const q=(cart[id]||0)+d; if(q<=0){const n={...cart};delete n[id];setCart(n);return;} if(p&&q>p.qty){alert(`Only ${p.qty} available!`);return;} setCart(c=>({...c,[id]:q})); };
  const togWish = (id) => setWish(w=>{const n=new Set(w);n.has(id)?n.delete(id):n.add(id);return n;});
  const PImg = ({p,h=130}) => (p.images||[]).length>0?<img src={p.images[0]} alt={p.name} style={{width:"100%",height:h,objectFit:"cover"}}/>:<div style={{width:"100%",height:h,display:"flex",alignItems:"center",justifyContent:"center",fontSize:h>100?52:28,background:"var(--s2)"}}>📦</div>;
  const statusCls = s => s==="Delivered"?"sg":(s==="Out for Delivery"||s==="Packed")?"sy":"sb";

  if (!auth) return (
    <>
      <style>{CSS}</style>
      <div className="authwrap">
        <div className="authbox">
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:26,color:"var(--t)",textAlign:"center",marginBottom:4}}>In <span style={{color:"var(--a)"}}>Minutes</span></div>
          <div style={{textAlign:"center",color:"var(--m)",fontSize:13,marginBottom:24}}>{authPage==="login"?"Sign in to order":"Create your account"}</div>
          {authPage==="login"?(<>
            <label className="inplbl">Email</label><input className="inp" type="email" placeholder="you@email.com" value={loginForm.email} onChange={e=>setLoginForm(f=>({...f,email:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            <label className="inplbl">Password</label><input className="inp" type="password" placeholder="Your password" value={loginForm.password} onChange={e=>setLoginForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            {authErr&&<div className="errmsg">{authErr}</div>}
            <button className="abtnp" onClick={doLogin}>Sign In →</button>
            <div className="alink" onClick={()=>{setAuthPage("register");setAuthErr("");}}>No account? <span>Register here</span></div>
          </>):(<>
            <label className="inplbl">Full Name</label><input className="inp" placeholder="Your name" value={regForm.name} onChange={e=>setRegForm(f=>({...f,name:e.target.value}))}/>
            <label className="inplbl">Phone</label><input className="inp" placeholder="+91 98765 43210" value={regForm.phone} onChange={e=>setRegForm(f=>({...f,phone:e.target.value}))}/>
            <label className="inplbl">Email</label><input className="inp" type="email" placeholder="you@email.com" value={regForm.email} onChange={e=>setRegForm(f=>({...f,email:e.target.value}))}/>
            <label className="inplbl">Password</label><input className="inp" type="password" placeholder="Create password" value={regForm.password} onChange={e=>setRegForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doRegister()}/>
            {authErr&&<div className="errmsg">{authErr}</div>}
            <button className="abtnp" onClick={doRegister}>Create Account →</button>
            <div className="alink" onClick={()=>{setAuthPage("login");setAuthErr("");}}>Already registered? <span>Sign In</span></div>
          </>)}
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {page==="home"&&<>
          <div className="topnav">
            <div className="r1"><div className="logo">In <span>Minutes</span></div><div className="dbdg">⚡ 20–30 min</div><div className="uav" onClick={()=>setPage("profile")}>{auth.name[0].toUpperCase()}</div></div>
            <div className="sbar"><span style={{color:"var(--m)"}}>🔍</span><input placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
            <div className="cats">{categories.map(c=><button key={c} className={`cbtn${cat===c?" act":""}`} onClick={()=>setCat(c)}>{c}</button>)}</div>
          </div>
          <div style={{overflowY:"auto",paddingBottom:80}}>
            {!search&&<div className="hero"><div className="hlbl">Fast Delivery</div><h2>Groceries at your door<br/>In Minutes ⚡</h2><p>Fresh products delivered fast.</p><button className="hbtn">Shop Now</button><div className="hem">🛒</div></div>}
            <div className="sec">
              <div className="stl">{search?`"${search}"`:cat==="All"?"All Products":cat}</div>
              {products.length===0?<div className="empty"><div style={{fontSize:48,marginBottom:12}}>📦</div><div>No products yet.</div></div>
              :filtered.length===0?<div className="empty"><div style={{fontSize:48,marginBottom:12}}>🔍</div><div>No results found.</div></div>
              :<div className="pgrid">{filtered.map(p=>(
                <div key={p.id} className="pcard">
                  <div className="pimg" onClick={()=>{setSelP(p);setImgIdx(0);setPage("detail");}}>
                    {(p.images||[]).length>0?<img src={p.images[0]} alt={p.name}/>:<div className="pimg-ph">📦</div>}
                    {!p.inStock&&<div className="ob">Out of Stock</div>}
                    <button className={`lb${wish.has(p.id)?" on":""}`} onClick={e=>{e.stopPropagation();togWish(p.id);}}>{wish.has(p.id)?"❤️":"🤍"}</button>
                  </div>
                  <div className="pinfo">
                    <div className="pn">{p.name}</div>
                    <div className="pp">₹{p.price}</div>
                    <div className="pstk" style={{color:p.qty===0?"#FF4E4E":p.qty<=5?"#FFB547":"#3AEFA8"}}>{p.qty===0?"Out of stock":`${p.qty} available`}</div>
                    <div className="dm">⚡ 20–30 min</div>
                    {p.inStock&&p.qty>0?(cart[p.id]?<div className="qctrl"><button className="qbtn" onClick={()=>updQty(p.id,-1)}>−</button><span style={{fontWeight:700,fontSize:14}}>{cart[p.id]}</span><button className="qbtn" onClick={()=>addCart(p.id)}>+</button></div>:<button className="addbtn" onClick={()=>addCart(p.id)}>+ Add</button>):<button className="addbtn" disabled style={{opacity:.4,cursor:"not-allowed"}}>Unavailable</button>}
                  </div>
                </div>
              ))}</div>}
            </div>
          </div>
          <div className="bnav">
            <div className="nvi act"><div className="nvico">🏠</div><div className="nvlbl">Home</div></div>
            <div className="nvi cbdg" onClick={()=>setPage("cart")}><div className="nvico">🛒</div>{cartCount>0&&<div className="bdot">{cartCount}</div>}<div className="nvlbl">Cart</div></div>
            <div className="nvi" onClick={()=>setPage("wishlist")}><div className="nvico">❤️</div><div className="nvlbl">Wishlist</div></div>
            <div className="nvi" onClick={()=>{fetchOrders(auth);setPage("orders");}}><div className="nvico">📦</div><div className="nvlbl">Orders</div></div>
            <div className="nvi" onClick={()=>setPage("profile")}><div className="nvico">👤</div><div className="nvlbl">Profile</div></div>
          </div>
        </>}

        {page==="detail"&&selP&&<div className="page" style={{paddingBottom:20}}>
          <div className="ph"><button className="bk" onClick={()=>setPage("home")}>←</button><div className="ptl">Product</div></div>
          <div className="imgslider">{(selP.images||[]).length>0?<img src={selP.images[imgIdx]} alt={selP.name}/>:<div className="imgslider-ph">📦</div>}</div>
          {(selP.images||[]).length>1&&<div className="imgdots">{selP.images.map((_,i)=><div key={i} className={`imgdot${i===imgIdx?" act":""}`} onClick={()=>setImgIdx(i)}/>)}</div>}
          <div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,marginBottom:6}}>{selP.name}</div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:800,color:"var(--a)",marginBottom:8}}>₹{selP.price}</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
            <span style={{background:"rgba(58,239,168,.1)",border:"1px solid rgba(58,239,168,.2)",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:600,color:"var(--g)"}}>⚡ 20–30 min</span>
            <span style={{fontSize:12,fontWeight:700,padding:"5px 12px",background:"var(--s2)",borderRadius:8,color:selP.qty===0?"#FF4E4E":selP.qty<=5?"#FFB547":"#3AEFA8"}}>{selP.qty===0?"Out of Stock":`${selP.qty} units available`}</span>
            <span style={{fontSize:12,padding:"5px 12px",background:"var(--s2)",borderRadius:8,color:"var(--m)"}}>📦 {selP.category}</span>
          </div>
          {selP.desc&&<div style={{fontSize:14,color:"var(--m)",lineHeight:1.6,marginBottom:16}}>{selP.desc}</div>}
          <div style={{display:"flex",gap:10,marginBottom:24}}>
            <button style={{flex:1,background:"var(--s2)",color:"var(--t)",border:"1px solid var(--b)",borderRadius:14,padding:14,fontSize:14,fontWeight:700,cursor:"pointer"}} onClick={()=>togWish(selP.id)}>{wish.has(selP.id)?"❤️ Saved":"🤍 Save"}</button>
            {selP.inStock&&selP.qty>0&&<button style={{flex:2,background:"linear-gradient(135deg,#FF5C3A,#FF8A5C)",color:"#fff",border:"none",borderRadius:14,padding:14,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Syne,sans-serif"}} onClick={()=>{addCart(selP.id);setPage("cart");}}>Add to Cart</button>}
          </div>
          {(()=>{const rel=products.filter(p=>p.id!==selP.id&&p.category===selP.category&&p.inStock&&p.qty>0).slice(0,3);if(!rel.length)return null;return(<><div style={{fontFamily:"Syne,sans-serif",fontSize:16,fontWeight:800,marginBottom:12}}>Similar Products</div><div className="relgrid">{rel.map(p=><div key={p.id} className="relcard" onClick={()=>{setSelP(p);setImgIdx(0);window.scrollTo(0,0);}}><div className="relimg">{(p.images||[]).length>0?<img src={p.images[0]} alt=""/>:<div className="relimg-ph">📦</div>}</div><div style={{padding:"8px 10px"}}><div style={{fontSize:12,fontWeight:600,marginBottom:2,lineHeight:1.3}}>{p.name}</div><div style={{fontFamily:"Syne,sans-serif",fontSize:13,fontWeight:700,color:"var(--a)"}}>₹{p.price}</div><div style={{fontSize:10,color:p.qty<=5?"#FFB547":"#3AEFA8",fontWeight:600}}>{p.qty} left</div></div></div>)}</div></>);})()}
        </div>}

        {page==="cart"&&<div className="page">
          <div className="ph"><button className="bk" onClick={()=>setPage("home")}>←</button><div className="ptl">My Cart</div></div>
          {cartItems.length===0?<div className="empty"><div style={{fontSize:56,marginBottom:12}}>🛒</div><div>Cart is empty!</div></div>:<>
            {cartItems.map(p=><div key={p.id} className="citem"><div className="cie">{(p.images||[]).length>0?<img src={p.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:"📦"}</div><div style={{flex:1}}><div className="cin">{p.name}</div><div className="cip">₹{p.price}</div><div style={{fontSize:11,color:p.qty<=5?"#FFB547":"var(--m)"}}>{p.qty} units available</div><div className="ciqc"><button className="ciqb" onClick={()=>updQty(p.id,-1)}>−</button><span style={{fontWeight:700,fontSize:14}}>{cart[p.id]}</span><button className="ciqb" onClick={()=>addCart(p.id)}>+</button></div></div><button className="rmv" onClick={()=>{const n={...cart};delete n[p.id];setCart(n);}}>Remove</button></div>)}
            <div className="sumbox"><div className="sr"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="sr"><span>Delivery</span><span>₹25</span></div><div className="sr tot"><span>Total</span><span>₹{subtotal+25}</span></div></div>
            <button className="chkbtn" onClick={()=>setPage("checkout")}>Proceed to Checkout →</button>
          </>}
        </div>}

        {page==="checkout"&&<div className="page">
          <div className="ph"><button className="bk" onClick={()=>setPage("cart")}>←</button><div className="ptl">Checkout</div></div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,marginBottom:12}}>Delivery Address</div>
          {(auth.addresses||[]).length===0?<div style={{background:"rgba(255,92,58,.08)",border:"1px solid rgba(255,92,58,.2)",borderRadius:14,padding:14,marginBottom:14,fontSize:13,color:"var(--m)"}}>No address. <span style={{color:"var(--a)",fontWeight:600,cursor:"pointer"}} onClick={()=>setAddrModal(true)}>Add one →</span></div>:<>
            {auth.addresses.map(a=><div key={a.id} className={`popt${selAddr===a.id?" sel":""}`} onClick={()=>setSelAddr(a.id)}><div className="pico">🏠</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{a.label}</div><div style={{fontSize:12,color:"var(--m)"}}>{a.line1}, {a.city} — {a.pincode}</div></div><div className={`radio${selAddr===a.id?" chk":""}`}/></div>)}
            <div style={{fontSize:13,color:"var(--a)",fontWeight:600,cursor:"pointer",marginBottom:14}} onClick={()=>setAddrModal(true)}>+ Add another address</div>
          </>}
          <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,marginBottom:12}}>Payment</div>
          {[{id:"cod",icon:"💵",name:"Cash on Delivery",sub:"Pay when delivered"},{id:"gpay",icon:"📱",name:"Google Pay",sub:"UPI"},{id:"phonepe",icon:"💜",name:"PhonePe",sub:"UPI"},{id:"paytm",icon:"💙",name:"Paytm",sub:"Wallet"}].map(o=><div key={o.id} className={`popt${payMethod===o.id?" sel":""}`} onClick={()=>setPayMethod(o.id)}><div className="pico">{o.icon}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,marginBottom:2}}>{o.name}</div><div style={{fontSize:12,color:"var(--m)"}}>{o.sub}</div></div><div className={`radio${payMethod===o.id?" chk":""}`}/></div>)}
          <div className="sumbox" style={{marginTop:8}}><div className="sr"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="sr"><span>Delivery</span><span>₹25</span></div><div className="sr tot"><span>Total</span><span>₹{subtotal+25}</span></div></div>
          {orderErr&&<div className="errmsg" style={{marginTop:10}}>{orderErr}</div>}
          <button className="chkbtn" style={{opacity:ordering?.6:1}} onClick={placeOrder} disabled={ordering}>{ordering?"Placing Order...":payMethod==="cod"?"Place Order":`Pay ₹${subtotal+25}`}</button>
        </div>}

        {page==="success"&&<div className="page"><div className="sucwrap"><div style={{fontSize:72,marginBottom:16}}>🎉</div><div style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:800,marginBottom:8}}>Order Placed!</div><div style={{color:"var(--m)",fontSize:14,marginBottom:24}}>Arriving in <strong style={{color:"var(--g)"}}>20–30 minutes</strong></div><button className="chkbtn" style={{maxWidth:240}} onClick={()=>{fetchOrders(auth);setPage("orders");}}>Track My Order →</button><div style={{fontSize:13,color:"var(--m)",marginTop:16,cursor:"pointer"}} onClick={()=>setPage("home")}>Continue Shopping</div></div></div>}

        {page==="orders"&&<div className="page">
          <div className="ph"><button className="bk" onClick={()=>setPage("profile")}>←</button><div className="ptl">My Orders</div></div>
          {userOrders.length===0?<div className="empty"><div style={{fontSize:48,marginBottom:12}}>📦</div><div>No orders yet!</div></div>
          :[...userOrders].reverse().map(o=>{
            const steps=["Confirmed","Packed","Out for Delivery","Delivered"];
            const stepIcons=["✅","📦","🚚","🎉"];
            const cur=steps.indexOf(o.status);
            return <div key={o.id} className="ordcard" style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:14}}>{o.id}</div>
                <span className={`stag ${statusCls(o.status)}`}>{o.status}</span>
              </div>
              {/* STATUS TRACKER */}
              <div style={{display:"flex",alignItems:"center",marginBottom:14,padding:"12px 10px",background:"var(--s2)",borderRadius:12}}>
                {steps.map((s,i)=><div key={s} style={{display:"flex",alignItems:"center",flex:i<3?"0 0 auto":undefined}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:i<=cur?"var(--a)":"var(--b)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:i<=cur?14:11,transition:"all .3s",border:i===cur?"2px solid #FF8A5C":"2px solid transparent",boxShadow:i===cur?"0 0 10px rgba(255,92,58,.4)":"none"}}>{i<=cur?stepIcons[i]:<span style={{color:"var(--m)"}}>○</span>}</div>
                    <div style={{fontSize:9,color:i<=cur?"var(--a)":"var(--m)",marginTop:4,fontWeight:i===cur?700:400,textAlign:"center",maxWidth:52,lineHeight:1.2}}>{s}</div>
                  </div>
                  {i<3&&<div style={{flex:1,height:2,background:i<cur?"var(--a)":"var(--b)",margin:"0 4px",marginBottom:16,minWidth:8,transition:"background .3s"}}/>}
                </div>)}
              </div>
              <div style={{fontSize:13,color:"var(--m)",marginBottom:6}}>{o.items.map(i=>`${i.name} x${i.quantity}`).join(", ")}</div>
              <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontFamily:"Syne,sans-serif",fontWeight:700}}>₹{o.total}</div><div style={{fontSize:11,color:"var(--m)"}}>{new Date(o.createdAt).toLocaleDateString("en-IN")}</div></div>
              {o.address&&<div style={{fontSize:11,color:"var(--m)",marginTop:4}}>📍 {o.address.line1}, {o.address.city}</div>}
            </div>;
          })}
        </div>}

        {page==="wishlist"&&<div className="page">
          <div className="ph"><button className="bk" onClick={()=>setPage("home")}>←</button><div className="ptl">Wishlist</div></div>
          {[...wish].length===0?<div className="empty"><div style={{fontSize:48,marginBottom:12}}>🤍</div><div>No saved products!</div></div>:<div className="pgrid">{products.filter(p=>wish.has(p.id)).map(p=><div key={p.id} className="pcard" onClick={()=>{setSelP(p);setImgIdx(0);setPage("detail");}}><div className="pimg"><PImg p={p} h={110}/></div><div className="pinfo"><div className="pn">{p.name}</div><div className="pp">₹{p.price}</div><div className="pstk" style={{color:p.qty===0?"#FF4E4E":"#3AEFA8"}}>{p.qty===0?"Out of stock":`${p.qty} left`}</div><button className="addbtn" style={{marginTop:8}} onClick={e=>{e.stopPropagation();if(p.inStock&&p.qty>0)addCart(p.id);}}>+ Add to Cart</button></div></div>)}</div>}
        </div>}

        {page==="profile"&&<div className="page">
          <div className="ph"><button className="bk" onClick={()=>setPage("home")}>←</button><div className="ptl">My Profile</div></div>
          <div className="prfhero"><div className="prfav">{auth.name[0].toUpperCase()}</div><div><div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800}}>{auth.name}</div><div style={{fontSize:13,color:"var(--m)",marginTop:2}}>{auth.phone}</div><div style={{fontSize:13,color:"var(--m)"}}>{auth.email}</div></div></div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,marginBottom:10}}>My Addresses</div>
          {(auth.addresses||[]).length===0?<div style={{background:"var(--s)",border:"1px solid var(--b)",borderRadius:14,padding:14,marginBottom:12,fontSize:13,color:"var(--m)"}}>No addresses saved.</div>:auth.addresses.map(a=><div key={a.id} className="addrcard"><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:700,fontSize:13,marginBottom:3}}>🏠 {a.label}</div><div style={{fontSize:13,color:"var(--m)"}}>{a.line1}</div><div style={{fontSize:13,color:"var(--m)"}}>{a.city} — {a.pincode}</div>{a.phone&&<div style={{fontSize:12,color:"var(--m)",marginTop:2}}>📞 {a.phone}</div>}</div><button onClick={()=>deleteAddress(a.id)} style={{background:"rgba(255,78,78,.1)",border:"none",color:"#FF4E4E",borderRadius:8,padding:"4px 10px",fontSize:12,cursor:"pointer",fontWeight:600}}>Remove</button></div></div>)}
          <button style={{width:"100%",background:"var(--s)",border:"1px dashed rgba(255,92,58,.3)",borderRadius:14,padding:12,color:"var(--a)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:20}} onClick={()=>setAddrModal(true)}>+ Add New Address</button>
          {[{icon:"📦",label:"My Orders",fn:()=>{fetchOrders(auth);setPage("orders");}},{icon:"❤️",label:"Wishlist",fn:()=>setPage("wishlist")},{icon:"🚚",label:"Track Order",fn:()=>{fetchOrders(auth);setPage("orders");}}].map((m,i)=><div key={i} className="mi" onClick={m.fn}><div className="mic">{m.icon}</div><div style={{flex:1,fontSize:14,fontWeight:600}}>{m.label}</div><div style={{color:"var(--m)",fontSize:18}}>›</div></div>)}
          <div className="mi" style={{marginTop:8,borderColor:"rgba(255,78,78,.2)"}} onClick={()=>{setAuth(null);setCart({});setWish(new Set());setUserOrders([]);}}>
            <div className="mic" style={{background:"rgba(255,78,78,.1)"}}>🚪</div>
            <div style={{flex:1,fontSize:14,fontWeight:600,color:"#FF4E4E"}}>Logout</div>
          </div>
        </div>}

        {addrModal&&<div className="mov" onClick={()=>{setAddrModal(false);setEditAddrId(null);setNewAddr({label:'Home',line1:'',city:'',pincode:'',phone:''});}}><div className="msh" onClick={e=>e.stopPropagation()}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,marginBottom:18}}>{editAddrId ? "✏️ Edit Address" : "📍 Add Address"}</div>
          <label className="inplbl">Label</label><select className="inp-sel" value={newAddr.label} onChange={e=>setNewAddr(a=>({...a,label:e.target.value}))}><option>Home</option><option>Work</option><option>Other</option></select>
          <label className="inplbl">Street / Area</label><input className="inp" placeholder="House no, Street, Area" value={newAddr.line1} onChange={e=>setNewAddr(a=>({...a,line1:e.target.value}))}/>
          <div className="irow"><div><label className="inplbl">City</label><input className="inp" placeholder="City" value={newAddr.city} onChange={e=>setNewAddr(a=>({...a,city:e.target.value}))}/></div><div><label className="inplbl">Pincode</label><input className="inp" placeholder="560001" value={newAddr.pincode} onChange={e=>setNewAddr(a=>({...a,pincode:e.target.value}))}/></div></div>
          <label className="inplbl">Phone (optional)</label><input className="inp" placeholder="+91 98765 43210" value={newAddr.phone} onChange={e=>setNewAddr(a=>({...a,phone:e.target.value}))}/>
          <button className="abtnp" onClick={addAddress}>Save Address ✓</button>
        </div></div>}
      </div>
    </>
  );
}
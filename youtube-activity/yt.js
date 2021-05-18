const discord = require('discord.js') //ติดตั้งโมดูล npm install discord.js
const fetch = require('node-fetch') //ติดตั้งโมดูล npm install node-fetch

const execute = async (Client, message, args) => {
    
    let channel = message.member.voice.channel;  //ขี้เกียจอธิบาย
    if(!channel) return message.channel.send("คุณต้องอยู่ใน vc") //กำหนดส่งเมื่อมีสิ่งผิดพลาด

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, { //ดึง api จาก v8 มาใช้
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,  //ขี้เกียจอธิบาย
            max_uses: 0, //จำนวนคน
            target_application_id: "755600276941176913", //YT ID
            target_type: 2,  //ขี้เกียจอธิบาย
            temporary: false,  //ขี้เกียจอธิบาย
            validate: null  //ขี้เกียจอธิบาย
        }), 
        headers: {
            "Authorization": `Bot ${Client.token}`, //ขี้เกียจอธิบาย
            "Content-Type": "application/json"  //ขี้เกียจอธิบาย
        }
    })
       

    .then(res => res.json())  //ขี้เกียจอธิบาย
    .then(invite => {  //ขี้เกียจอธิบาย
        if(!invite.code) return message.channel.send("น่าเศร้าที่ฉันไม่สามารถเริ่มต้น yt ด้วยกัน") //กำหนดส่งเมื่อมีสิ่งผิดพลาด
        message.channel.send(`https://discord.com/invite/${invite.code}`) //กำหนดส่งแบบข้อความ

        /*----------------รูปแบบ EMBEDS----------------*/
        //const dx = new discord.MessageEmbed()
        //.setDescription(`https://discord.com/invite/${invite.code}`)
        //message.channel.send(dx)


    })
};

module.exports = {
    name: 'yt1', 
    execute,

};
package fullhouse.mobileKotlin

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import com.google.gson.Gson
import com.google.gson.JsonParser
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val but = findViewById<Button>(R.id.button)
        val EditYS = findViewById<EditText>(R.id.editIDYS)

        SocketHandler.setSocket()
        SocketHandler.SetActivity(this)

        val mySocket = SocketHandler.getSocket()

        but.setOnClickListener {
            setContentView(R.layout.chat)

            var btnPushMsg = findViewById<Button>(R.id.pushMsg)
            var editMsg = findViewById<EditText>(R.id.editMsg)
            val socket = SocketHandler.getSocket()
            val msgs = SocketHandler.getMsgs()
            var userName = EditYS.text.toString()
            val msgLay = findViewById<LinearLayout>(R.id.msg_layout)

            msgLay.scrollTo(0, msgLay.bottom);
            SocketHandler.SM.UserName = userName

            UpdateChat(msgs)

            btnPushMsg.setOnClickListener {
                var msg = DCMsgs(SocketHandler.SM.UserName, editMsg.text.toString(), "11")
                mySocket.emit("new message",  JSONObject(Gson().toJson(msg)))
                editMsg.setText("")

            }
        }


        try {
            mySocket.connect()
        }
        catch (e: Error){
            Log.e("azaza", e.message.toString())
        }
    }

    fun UpdateChat(msgs: Array<DCMsgs>) {
        msgs.forEach { el -> AddMsgToChat(el) }
    }

    fun AddMsgToChat(DCMsg: DCMsgs) {

        val ctx = findViewById<LinearLayout>(R.id.msg_layout)
        Log.d("azaza", "Add gone")

        var userName = SocketHandler.SM.UserName

        val msg = TextView(this)
        msg.text = "${DCMsg.user} \n ${DCMsg.msg}"

        if (userName == DCMsg.user){
            msg.text = "Я \n ${DCMsg.msg}"
            msg.textAlignment = View.TEXT_ALIGNMENT_VIEW_END
        }

        ctx.addView(msg)

        Log.d("azaza", "Add done")
    }
}
package fullhouse.mobileKotlin

import android.util.Log
import android.widget.LinearLayout
import com.google.gson.JsonArray
import com.google.gson.JsonParser
import io.socket.client.IO
import io.socket.client.Socket
import java.net.URISyntaxException

object SocketHandler{
    private lateinit var mySocket: Socket
    private lateinit var Activity: MainActivity
    var GP: GoodParser = GoodParser()
    var SM: StateManager = StateManager

    @Synchronized
    fun listenOn(){
        mySocket.on("store msgs"){ parameters ->
            val jsonArrString = parameters[0].toString()
            val jsonElement = JsonParser.parseString(jsonArrString)
            val jsonArray: JsonArray = jsonElement.asJsonArray
            SM.ArrMsgs = GP.parserJSONArray(jsonArray)
        }

        mySocket.on("new message"){ msg ->
            val thred = Thread{
                Activity.runOnUiThread{
                    val jsonArrString = msg[0].toString()
                    val jsonElement = JsonParser.parseString(jsonArrString)
                    val msg = GP.parserJSON(jsonElement)

                    Activity.AddMsgToChat( msg)
                }
            }
            thred.start()
        }
    }
    @Synchronized
    fun SetActivity(Activity: MainActivity){
        this.Activity = Activity
    }
    @Synchronized
    fun setSocket(){
        try {
            mySocket = IO.socket("https://production-scin.onrender.com")
            listenOn()
        }
        catch (e: URISyntaxException){
            Log.e("Err", e.toString())
        }
    }
    @Synchronized
    fun getSocket():Socket{
        Log.d("azaza", "get Socket")
        return mySocket
    }

    @Synchronized
    fun getMsgs(): Array<DCMsgs>{
        Log.d("azaza", "getMsgs")
        return SM.ArrMsgs
    }
}
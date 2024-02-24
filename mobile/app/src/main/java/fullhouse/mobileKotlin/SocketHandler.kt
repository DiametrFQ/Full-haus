package fullhouse.mobileKotlin

import android.util.Log
import com.google.gson.JsonArray
import com.google.gson.JsonParser
import io.socket.client.IO
import io.socket.client.Socket
import java.net.URISyntaxException

object SocketHandler{
    lateinit var mySocket: Socket
    private var GP: GoodParser = GoodParser()
    private var SM: StateManager = StateManager

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
    fun listenOn(){
        Log.d("azaza", "listenOn")
        mySocket.on("store msgs"){ parameters ->
            val jsonArrString = parameters[0].toString()
            val jsonElement = JsonParser.parseString(jsonArrString)
            val jsonArray: JsonArray = jsonElement.asJsonArray
            SM.ArrMsgs = GP.parserJSONArray(jsonArray)
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
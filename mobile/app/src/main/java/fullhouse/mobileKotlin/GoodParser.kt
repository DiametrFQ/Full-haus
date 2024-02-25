package fullhouse.mobileKotlin

import android.util.Log
import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonElement

data class DCMsgs (
    var user: String,
    var msg:  String,
    var userid: String,
)
class GoodParser {
    val gson = Gson()

    fun parserJSONArray(jsonArray: JsonArray): Array<DCMsgs> {
        var ArrMsgs: Array<DCMsgs> = arrayOf()

        for (jsonEl in jsonArray) {
            ArrMsgs += gson.fromJson(jsonEl, DCMsgs::class.java)
        }
        Log.d("azaza", ArrMsgs.size.toString())
        return ArrMsgs
    }

    fun parserJSON(jsonEl: JsonElement): DCMsgs {
        return gson.fromJson(jsonEl, DCMsgs::class.java)
    }
}
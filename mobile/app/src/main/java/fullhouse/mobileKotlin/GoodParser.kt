package fullhouse.mobileKotlin

import android.util.Log
import com.google.gson.Gson
import com.google.gson.JsonArray

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
            Log.d("azaza", "JSON Element")
            Log.d("azaza", jsonEl.toString())
            ArrMsgs += gson.fromJson(jsonEl, DCMsgs::class.java)
        }
        Log.d("azaza", ArrMsgs.size.toString())
        return ArrMsgs
    }
}
package fullhouse.mobileKotlin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val but = findViewById<Button>(R.id.button)

        SocketHandler.setSocket()

        val mySocket = SocketHandler.getSocket()

        but.setOnClickListener {
            Log.d("azaza", "test")
            mySocket.emit("test")
        }


        try {
            mySocket.connect()
            Log.d("azaza", mySocket.javaClass.toString())
        }
        catch (e: Error){
            Log.e("azaza", e.message.toString())
        }
    }
}
export class DayBoilerValues{

    Attribute:String;
    time_10:Number;
    time_12:Number;
    time_14:Number;
    time_16:Number;
    time_18:Number;
    time_20:Number;
    
    
}

export class NightBoilerValues{

    Attribute:String;
    time_22:Number;
    time_00:Number;
    time_02:Number;
    time_04:Number;
    time_06:Number;
    time_08:Number;

}

export class DayThermopackValues{

    Attribute:String;
    time_10:Number;
    time_12:Number;
    time_14:Number;
    time_16:Number;
    time_18:Number;
    time_20:Number;
    }

export class NightThermopackValues{

    Attribute:String;
    time_22:Number;
    time_00:Number;
    time_02:Number;
    time_04:Number;
    time_06:Number;
    time_08:Number;
}

export class Boiler{

        streamPressusre:Number;
        drumWaterLevel:Number;
        feedPump:Number;
        flueGasTemp:Number;
        bedTemp:Number;
        draftPressure:Number;
        idFan:Number;
        daOne:Number;
        daTwo:Number;
        daThree:Number;
        screwFeeder:Number;
        waterMeter:Number;
        loadData:Number;
        controlId: Number;
        timeOf:String;
        userHeadId:Number;
        dateToEnter:String;
    }

    export class Thermopack{

        forwardTemp:Number;
        returnTemp: Number;
        stackTemp:Number;
        furnaceTemp:Number;
        pumpData:Number;
        idFan:Number;
        fdFan:Number;
        screwFeeder:Number;
        controlId:Number;
        timeOf:String;
        userHeadId: Number;
        dateToEnter:String;
    }
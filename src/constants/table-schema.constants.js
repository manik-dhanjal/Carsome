export const LINK_STATS = [
    {
        name:"Date",
        id:"date",
        dataModifier:(data) => data.toLocaleDateString("en-US")
    },
    {
        name:"Campaign",
        id:"campaign"

    },
    {
        name:"Clicks",
        id:"clicks",
    },
    {
        name:"Conversions",
        id:"conversion",
    },{
        name:"Refrence 1",
        id:"ref1"
    },{
        name:"Refrence 2",
        id:"ref2"
    },{
        name:"Commission",
        id:"commission",
        dataModifier: (data) => "RM "+data
    }
]
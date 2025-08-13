
import ActionCard from "../../Component/ActionCard"
import PageLayout from "../../Component/PageLayout/PageLayout"
import { getSubtitle } from "../../fonctionUtilitaire/getSubtitle"



function RhAccueil(){
const rhButton =[
    {
      label: "Mettre a jour les profils",
      onClick: () => console.log('importer')
    },
    {
      label: "Télécharger model excel",
      onClick: () => console.log('download')
    },
]
    return(
        <PageLayout
        title="Dashboard RH"
              subtitle={getSubtitle("gestion")}
              service="Service Ressources Humaines"
        >
        <ActionCard buttons={rhButton}/>
        </PageLayout>
       
    )
}
export default RhAccueil

import ActionCard from "../../Component/ActionCard"
import PageLayout from "../../Component/PageLayout/PageLayout"
import { getSubtitle } from "../../fonctionUtilitaire/getSubtitle"
import { useNavigate } from "react-router-dom"



function RhAccueil(){

const navigate = useNavigate()

const rhButton =[
    {
      label: "Mettre a jour les profils",
      onClick: () => navigate('/rh/upload')
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
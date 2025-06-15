import { ClippingsSection } from "./components/molecules/ClippingsSection";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
    return (
        <TooltipProvider>
            <ClippingsSection className="m-8" />
        </TooltipProvider>
    );
}

export default App;

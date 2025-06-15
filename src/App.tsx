import { ClippingsSection } from "./components/molecules/ClippingsSection";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
    return (
        <TooltipProvider>
            <ClippingsSection />
        </TooltipProvider>
    );
}

export default App;

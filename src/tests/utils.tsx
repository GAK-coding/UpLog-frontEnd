import {MemoryRouter, Routes} from "react-router-dom";

export function withRouter(routes: JSX.Element, initialEntry: string = "/"): JSX.Element {
    return (
        <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>{routes}</Routes>
        </MemoryRouter>
    );
}
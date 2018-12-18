import { Routes, RouterModule } from '@angular/router';
import * as fromComponents from '../../projects/components';
import * as fromAuthGuards from '../../auth/guards';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'changelog',
    loadChildren: './changelog/changelog.module#ChangeLogModule'
  },
  {
    path: 'full-layout',
    loadChildren: './pages/full-layout-page/full-pages.module#FullPagesModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
  {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule',
  },
];

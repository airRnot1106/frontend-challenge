import { HttpResponse } from 'msw';

import {
  fakeContent,
  fakeContentControllerGetAllContentListResponse,
} from '../generated/@faker-js/faker.gen';
import { createMswHandlers } from '../generated/msw.gen';
import { API_BASE_URL } from '../hey-api';

export const mocks = createMswHandlers({ baseUrl: API_BASE_URL });

export const handlers = mocks.all({
  pick: {
    contentControllerAddContent: async ({ request }) =>
      HttpResponse.json(
        { ...fakeContent(), ...(await request.json()) },
        { status: 201 },
      ),
    contentControllerDeleteContent: () =>
      new HttpResponse(null, { status: 204 }),
    contentControllerGetAllContentList: () =>
      HttpResponse.json(fakeContentControllerGetAllContentListResponse()),
    contentControllerGetContent: ({ params }) =>
      HttpResponse.json({ ...fakeContent(), id: Number(params.id) }),
    contentControllerUpdateContent: async ({ params, request }) =>
      HttpResponse.json({
        ...fakeContent(),
        ...(await request.json()),
        id: Number(params.id),
      }),
  },
});

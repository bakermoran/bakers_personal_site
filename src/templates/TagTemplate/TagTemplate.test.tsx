import React from "react";

import { render as reactTestingLibraryRender } from "@testing-library/react";
import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { testUtils } from "@/utils";

import TagTemplate, { Head as GatsbyHead } from "./TagTemplate";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("TagTemplate", () => {
  const props = {
    data: {
      allMarkdownRemark: mocks.allMarkdownRemark,
    },
    pageContext: mocks.pageContext,
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  test("renders correctly", () => {
    const tree = testUtils
      .createSnapshotsRenderer(<TagTemplate {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("head renders correctly", () => {
    reactTestingLibraryRender(<GatsbyHead {...props} />);

    expect(testUtils.getMeta("twitter:card")).toEqual("summary_large_image");
    expect(testUtils.getMeta("twitter:title")).toEqual(
      "Urbanism - Page 2 - Blog by Baker Moran",
    );
    expect(testUtils.getMeta("og:title")).toEqual(
      "Urbanism - Page 2 - Blog by Baker Moran",
    );
    expect(testUtils.getMeta("description")).toEqual(
      "A personal site and blog by Baker Moran.",
    );
    expect(testUtils.getMeta("twitter:description")).toEqual(
      "A personal site and blog by Baker Moran.",
    );
    expect(testUtils.getMeta("og:description")).toEqual(
      "A personal site and blog by Baker Moran.",
    );
  });
});

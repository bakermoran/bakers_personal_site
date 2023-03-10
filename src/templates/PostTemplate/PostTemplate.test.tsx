import React from "react";

import { render as reactTestingLibraryRender } from "@testing-library/react";
import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { testUtils } from "@/utils";

import PostTemplate, { Head as GatsbyHead } from "./PostTemplate";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("PostTemplate", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  test("renders correctly", () => {
    const props = {
      data: {
        markdownRemark: mocks.markdownRemark,
      },
    };

    const tree = testUtils
      .createSnapshotsRenderer(<PostTemplate {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("head renders correctly", () => {
    const props = {
      data: {
        markdownRemark: mocks.markdownRemarkWithoutDescription,
      },
    };

    reactTestingLibraryRender(<GatsbyHead {...props} />);

    expect(testUtils.getMeta("twitter:card")).toEqual("summary_large_image");
    expect(testUtils.getMeta("twitter:title")).toEqual(
      "Why use Bayesian Statistics for AB Testing - Blog by Baker Moran",
    );
    expect(testUtils.getMeta("og:title")).toEqual(
      "Why use Bayesian Statistics for AB Testing - Blog by Baker Moran",
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

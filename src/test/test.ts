console.clear();

type ParsedHLS = Partial<{
  version: number;
  resolution: {
    width: number;
    height: number;
  };
}>;

const foo = function* (){

}


const parse = (hls: string): ParsedHLS => {


  let check = hls.split('\n')
  let version = check[0];
  let stream = check[2];
  let version1 = version.split(':');
  let version2 = stream.split('x');
  let resolution = version2[0];
  let res = resolution.split('=');



    return {
      "version": parseInt(version1[1]),
      "resolution": {
        "width": parseInt(res[1]),
        "height": parseInt(version2[version2.length-1])
    }
  };
}

const parsed = parse(
  `#EXT-X-VERSION:99

#EXT-X-STREAM-INF:RESOLUTION=1920x800`
);









// --------------------- Do not edit below --------------------- //

/*
Task:
  Create a simple HLS parser.

Input:
  #EXT-X-VERSION:99
  #EXT-X-STREAM-INF:RESOLUTION=1920x800

Output:
  {
    version: 99,
    resolution: {
      width: 1920,
      height: 800,
    }
  }

Notes:
  - Split on \n
  - To simplify, assume that no additional tags or attributes are available
*/

const received = JSON.stringify(parsed, null, 2);
const expected = JSON.stringify({ version: 99, resolution: { width: 1920, height: 800 } }, null, 2);

console.log(`\nPass: ${received === expected}\n\nReceived: ${received}\n\nExpected: ${expected}\n`);

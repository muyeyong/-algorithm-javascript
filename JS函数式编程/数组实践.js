var increment = v => ++v;
var decrement = v => --v;
var square = v => v * v;

var double = v => v * 2;

var compose =
    (...fns) =>
        result => {
            var list = fns.slice();

            while (list.length > 0) {
                // 将最后一个函数从列表尾部拿出
                // 并执行它
                result = list.pop()( result );
            }

            return result;
        };

console.log(
    [increment,decrement,square]
.map( fn => compose( fn, double ) )
.map( fn => fn( 3 ) )
)
// [7,5,36]


var unique =
    arr =>
        arr.filter(
            (v,idx) =>
                arr.indexOf( v ) == idx
        );

console.log(unique( [1,4,7,1,3,1,7,9,2,6,4,0,5,3] ))

var unique =
    arr =>
        arr.reduce(
            (list,v) =>
                list.indexOf( v ) == -1 ?
                    ( list.push( v ), list ) : list
        , [] );
console.log(unique( [1,4,7,1,3,1,7,9,2,6,4,0,5,3] ))

function formatStockNumbers(stock) {
    var updateTuples = [
        [ "price", formatPrice( stock.price ) ],
        [ "change", formatChange( stock.change ) ]
    ];

    return reduce( function formatter(stock,[propName,val]){
        return setProp( propName, stock, val );
    } )
    ( stock )
    ( updateTuples );
}





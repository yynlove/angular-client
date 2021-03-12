import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

/**
 * 路由复用
 */
export class SimpleReuseStrategy implements RouteReuseStrategy{

    public static handlers: { [key: string]: DetachedRouteHandle } = {}

    /**
     * 确定是否应分离此路由（及其子树）以便以后复用
     * @param route 
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        //表示对所有路由进行复用
        return route.routeConfig && route.routeConfig.data && route.routeConfig.data.useCache;

    }

    /**
     * 存储分离的路由。
     * @param route 
     * @param handle 
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {

        //当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象
        SimpleReuseStrategy.handlers[route.routeConfig.path] = handle;
    }
    /**
     * 确定是否应重新连接此路由（及其子树）
     * @param route 
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // 若 path 在缓存中有的都认为允许还原路由
        return !!route.routeConfig && !!SimpleReuseStrategy.handlers[route.routeConfig.path]
    }

    /**
     * 检索以前存储的路由
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // 从缓存中获取快照，若无则返回nul
       if(!route.routeConfig){
           return null;
       }
       return SimpleReuseStrategy.handlers[route.routeConfig.path];
    }

    /**
     * 确定是否应复用路由
     * @param future 
     * @param curr 
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        //进入路由触发，判断是否同一路由 
        return future.routeConfig === curr.routeConfig
    }
    
}